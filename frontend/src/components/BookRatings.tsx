import { useState, useEffect, useCallback } from 'react';
import BookList from './BookList';
import { getTopBooks, getRecommendations } from '../services';
import { IMightHaveRatingBook } from '../types';
import SuggestionButton from './SuggestionButton';
import RecommendedBookTable from './RecommendedBookTable';
import ResetButton from './ResetButton';


const shuffle = (array: number[]) => { 
  return array.sort(() => Math.random() - 0.5); 
}; 

const arr = [] as number[];

for (let i =  0;  i < 100; i++) {
  arr.push(i);
}

function BookRatings() {
  const [books, setBooks] = useState<IMightHaveRatingBook[]>([]); 
  const [recommendedBooks, setRecommenedBooks] = useState<IMightHaveRatingBook[]>([]);
  const [indices, setIndices] = useState<number[]>(shuffle(arr).slice(0,12));

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

  const reset = useCallback(() => {

    setBooks([]);
    setRecommenedBooks([]);
    setIndices(shuffle(arr).slice(0,12));

  } , [setBooks,setRecommenedBooks]);



  const getRecommendationsHandler = useCallback(async () => {

    const tempRecommendedBooks = await getRecommendations(books);
    setRecommenedBooks(tempRecommendedBooks);

  }
   , [books,setRecommenedBooks]
   );

   

  return (
    <div className="BookRatings">
   
      {recommendedBooks.length >0 ? <><RecommendedBookTable books={recommendedBooks}/> <ResetButton onClick={reset}/></>
      : <><BookList books={books} updateBookRating={updateBookRating} />  {books.filter((b) => b?.rating).length >=5 ? <SuggestionButton onClick={getRecommendationsHandler} /> :
      null}</>}

    
      {books.filter((b) => b?.rating).length < 5 && recommendedBooks.length===0 ?  <p>Please rate at least 5 books</p>:null}
   
    </div>
  );
}

export default BookRatings;
