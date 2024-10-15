import pandas as pd
from models import Book

# Read books and ratings data from CSV files using ISO-8859-1 encoding and semicolon delimiter. Skip lines with bad formatting.
books_df = pd.read_csv(
    "./books_data/books.csv", encoding="ISO-8859-1", sep=";", on_bad_lines="skip"
)
ratings_df = pd.read_csv("./books_data/ratings.csv", encoding="ISO-8859-1", sep=";")
users_df = pd.read_csv("./books_data/users.csv", encoding="ISO-8859-1", sep=";")

# Aggregate ratings to find the top 100 books based on number of ratings, and merge with books data on 'ISBN' column
top_books_df = (
    ratings_df.groupby("ISBN")
    .count()
    .sort_values(by="Book-Rating", ascending=False)
    .reset_index()
    .iloc[:100]
    .merge(books_df, on="ISBN")
    .drop(columns=["User-ID", "Book-Rating"])
)

# Initialize list to store top books objects
top_books = []
for index, row in top_books_df.iterrows():
    top_books.append(Book(row))


def get_book(isbn):
    """Retrieve a Book object by its ISBN."""
    # Filter the books DataFrame for the given ISBN and return the first match or None if not found
    book = books_df[books_df["ISBN"] == isbn]

    if len(book) > 0:
        return Book(book.iloc[0])

    return None


def get_top_100_books():
    """Retrieve the list of top 100 books."""
    # Return the list containing top book objects
    return top_books