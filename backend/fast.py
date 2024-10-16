from fastapi import FastAPI, HTTPException

import crud  # Assuming 'crud' module contains get_book and get_top_100_books functions.

from fastapi.middleware.cors import CORSMiddleware
from models import Book, RatedBook
from typing import Optional, List

app = FastAPI()

# You can add additional URLs to this list, for example, the frontend's production domain, or other frontends.
allowed_origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["X-Requested-With", "Content-Type", "Access-Control-Allow-Origin"],
)


@app.get("/", description="Root endpoint returning a greeting message.")
async def root():
    return {"message": "Hello World"}


@app.get("/book/{isbn}", description="Retrieve book details by ISBN")
async def get_book(isbn: str):
    try:
        return await crud.get_book(
            isbn
        )  # Assumes an async version of get_book function is available in the 'crud' module.
    except (
        Exception
    ) as error:  # Gracefully handle any errors that may occur during book retrieval.
        raise HTTPException(status_code=503, detail="Book not found")


@app.get("/top-books", description="Retrieve top 100 books by rating or popularity.")
async def get_top_books():
    try:
        return (
            crud.get_top_100_books()
        )  # Assumes a sync version of get_top_100_books function is available in the 'crud' module.
    except (
        Exception
    ) as error:  # Gracefully handle any errors that may occur during retrieval of top books.
        raise HTTPException(status_code=503, detail="Unable to retrieve top books")


@app.post("/get-recommendations")
async def get_recommendations(books: List[RatedBook]):
    recommendations = crud.get_recommmendations(books)
    return recommendations
