import { useState, useEffect, useCallback } from 'react';
import BookList from './BookList';
import { getTopBooks, getRecommendations } from '../services';
import { IMightHaveRatingBook } from '../types';
import SuggestionButton from './SuggestionButton';
interface IProps {
  indices: number[];
}

function BookRatings(props: IProps) {
  const { indices } = props;
  const [books, setBooks] = useState<IMightHaveRatingBook[]>([]); 
  const [recommendedBooks, setRecommenedBooks] = useState<IMightHaveRatingBook[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const tempBooks = await getTopBooks();
      setBooks(indices.map((i) => tempBooks[i]));
    };
    if (books.length === 0) {
    loadBooks();
  }
  }, [books, books.length, indices]);

  const updateBookRating = useCallback(
    (book?: IMightHaveRatingBook, newRating?: number) => {
      if (!book || !newRating || books.length === 0) {
      return;
    }
      setBooks((books) =>
        books.map((b) => b === book ? { ...book, rating: newRating } : b)
  );

    },
    [books]
  );


  const getRecommendationsHandler = useCallback(async () => {

    const tempRecommendedBooks = await getRecommendations(books);
    setRecommenedBooks(tempRecommendedBooks);

  }
   , [books,recommendedBooks,setRecommenedBooks]
   );


  return (
    <div className="BookRatings">
      <BookList books={books} updateBookRating={updateBookRating} />
      <SuggestionButton onClick={getRecommendationsHandler} />
    </div>
  );
}

export default BookRatings;
