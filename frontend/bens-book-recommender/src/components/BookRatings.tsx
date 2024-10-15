import { useState, useEffect } from "react";
import BookList from "./BookList";
import { getTopBooks } from "../services";
import { IMightHaveRatingBook } from "../types";
interface IProps{
  indeces: number[];
}

function BookRatings(props:IProps) {

  const {indeces}= props;

  const [books, setBooks] = useState<IMightHaveRatingBook[]>([]);  

  useEffect(()=>{
    
    const loadBooks = async () => {

      const tempBooks =  await getTopBooks();
      setBooks(indeces.map((i)=>tempBooks[i]));


    }
  
  if(books.length===0){
    loadBooks();
  }
}
  ,[books,books.length,indeces]

  );

  return (
    <div className="BookRatings">

      <BookList books={books} />
      
    </div>
  );
}

export default BookRatings;
