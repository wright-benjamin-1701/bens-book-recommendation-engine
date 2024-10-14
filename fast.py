from fastapi import FastAPI

from crud import get_book, get_top_100_books

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/book/{isbn}")
async def book(isbn:str):
    return get_book(isbn)

@app.get("/top_books")
async def top_books():
    return get_top_100_books()