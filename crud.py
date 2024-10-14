import pandas as pd

books_df = pd.read_csv('books_data/books.csv',encoding='ISO-8859-1', sep=';', on_bad_lines='skip')
ratings_df = pd.read_csv('books_data/ratings.csv',encoding='ISO-8859-1', sep=';')
users_df = pd.read_csv('books_data/users.csv',encoding='ISO-8859-1', sep=';')


# "ISBN";"Book-Title";"Book-Author";"Year-Of-Publication";"Publisher";"Image-URL-S";"Image-URL-M";"Image-URL-L"
top_books_df = ratings_df.groupby('ISBN').count().sort_values(by='Book-Rating',ascending=False).reset_index().iloc[0:100].merge(books_df,on='ISBN').drop(columns=['User-ID','Book-Rating'])

top_books = []
for ind,row in top_books_df.iterrows():
    top_books.append(row)    

def get_book(isbn):

    book = books_df[books_df['ISBN']==isbn]

    if len(book) > 0:
        return book.iloc[0]

    return None

def get_top_100_books():
    return top_books
    