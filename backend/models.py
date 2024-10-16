# "ISBN";"Book-Title";"Book-Author";"Year-Of-Publication";"Publisher";"Image-URL-S";"Image-URL-M";"Image-URL-L"

from pydantic import BaseModel


class Book(BaseModel):
    isbn: str = None
    title: str = None
    author: str = None
    yop: str = None
    publisher: str = None
    image_url_m: str = None


class RatedBook(Book):
    rating: int = None
