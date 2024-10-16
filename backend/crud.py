import pandas as pd
from models import Book, RatedBook
from typing import Optional, List
import engine
from engine import top_books_df, books_df


def create_book(book_df_row):
    book = Book()
    book.isbn = book_df_row["ISBN"]
    book.title = book_df_row["Book-Title"]
    book.author = book_df_row["Book-Author"]
    book.yop = book_df_row["Year-Of-Publication"]
    book.publisher = book_df_row["Publisher"]
    book.image_url_m = book_df_row["Image-URL-M"]
    return book


def create_books(book_df):
    books = []
    for index, row in book_df.iterrows():
        book = create_book(row)
        books.append(book)
    return books


def create_book_df(books: List[RatedBook]) -> pd.DataFrame:
    book_rows = []
    for book in books:
        print(book, type(book))
        book_rows.append(
            {
                "ISBN": book.isbn,
                "Book-Rating": book.rating,
                "Year-Of-Publication": book.yop,
                "Book-Title": book.title,
                "Book-Author": book.author,
                "Publisher": book.publisher,
                "Image-URL-M": book.image_url_m,
            }
        )

    return pd.DataFrame(book_rows)


# Initialize list to store top books objects
top_books = []
for index, row in top_books_df.iterrows():
    top_books.append(create_book(row))


def get_book(isbn):
    """Retrieve a Book object by its ISBN."""
    # Filter the books DataFrame for the given ISBN and return the first match or None if not found
    book = books_df[books_df["ISBN"] == isbn]

    if len(book) > 0:
        return create_book(book.iloc[0])

    return None


def get_top_100_books():
    """Retrieve the list of top 100 books."""
    # Return the list containing top book objects
    return top_books


def get_recommmendations(books):

    book_df = create_book_df(books)
    book_df = engine.get_labels(book_df)

    recommends_df = engine.run_xgb_recommends(book_df)
    recommendations = create_books(recommends_df)
    return recommendations
