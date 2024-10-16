import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.cluster import KMeans

import xgboost as xgb


# Read books and ratings data from CSV files using ISO-8859-1 encoding and semicolon delimiter. Skip lines with bad formatting.
books_df = pd.read_csv(
    "./books_data/books.csv", encoding="ISO-8859-1", sep=";", on_bad_lines="skip"
)
ratings_df = pd.read_csv("./books_data/ratings.csv", encoding="ISO-8859-1", sep=";")
users_df = pd.read_csv("./books_data/users.csv", encoding="ISO-8859-1", sep=";")


books_df = (
    books_df[~books_df["Year-Of-Publication"].isin(["DK Publishing Inc", "Gallimard"])]
    .reset_index()
    .drop(columns=["index"])
)
books_df["Year-Of-Publication"] = books_df["Year-Of-Publication"].map(str)


top_books_df = (
    ratings_df.groupby("ISBN")
    .count()
    .sort_values(by="Book-Rating", ascending=False)
    .reset_index()
    .iloc[:101]
    .merge(books_df, on="ISBN")
    .drop(columns=["User-ID", "Book-Rating"])
).dropna()

cluster_df = (
    ratings_df.merge(users_df, on="User-ID")
    .merge(
        books_df[["ISBN", "Year-Of-Publication", "Book-Author", "Book-Title"]],
        on="ISBN",
    )
    .dropna()
    .reset_index()
    .drop(columns=["index", "Age", "Location", "User-ID", "Book-Title"])
)

cat_cols = ["ISBN", "Book-Author", "Year-Of-Publication"]
# encode categorical columns

les = {}

df = pd.DataFrame(cluster_df)

for col in cat_cols:
    les[col] = LabelEncoder()
    les[col].fit(books_df[col])

for col in cat_cols:

    df[col] = les[col].transform(cluster_df[col])


scaler = StandardScaler().fit(df)
s_df = scaler.transform(df)

N_CLUSTERS = 26

# initialize the custering model
kmeans = KMeans(n_clusters=N_CLUSTERS)
kmeans.fit(s_df)
labels = kmeans.predict(s_df)

cluster_df["Label"] = labels
df["Label"] = labels
#
xgb_model = xgb.Booster()
xgb_model.load_model("xgb_deploy.json")

pred_dfs = []
for i in range(N_CLUSTERS):
    pred_dfs.append(pd.DataFrame(books_df[["ISBN"]]))
    pred_dfs[i]["ISBN"] = les["ISBN"].transform(pred_dfs[i]["ISBN"])
    pred_dfs[i]["Label"] = i
    pred_dfs[i]["Book-Rating"] = xgb_model.predict(xgb.DMatrix(pred_dfs[i]))


def get_labels(book_df):

    book_df = book_df.dropna()
    encoded_df = pd.DataFrame(book_df).drop(
        columns=[
            "Book-Title",
            "Image-URL-M",
            "Publisher",
        ]
    )

    for col in cat_cols:
        le = les[col]
        encoded_df[col] = le.transform(book_df[col])

    book_df["Label"] = kmeans.predict(scaler.transform(encoded_df))
    return book_df


def run_xgb_recommends(book_df):
    vals = book_df["Label"].values

    recommends_df = pd.DataFrame(pred_dfs[vals[0]])
    for i in range(1, len(vals)):

        recommends_df["Book-Rating"] += pred_dfs[vals[i]]["Book-Rating"]

    recommends_df["Book-Rating"] = recommends_df["Book-Rating"] / len(vals)

    recommends_df["ISBN"] = les["ISBN"].inverse_transform(recommends_df["ISBN"])
    recommends_df = recommends_df.sort_values(by="Book-Rating", ascending=False)

    recommends_df = recommends_df.head(100)

    recommends_df = recommends_df.merge(books_df, on="ISBN", how="inner").drop(
        columns=["Label"]
    )

    recommends_df = recommends_df[recommends_df["Year-Of-Publication"] != "0"]

    return recommends_df
