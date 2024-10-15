import { IMightHaveRatingBook } from "../types";
import BookItem from "./BookItem";

interface IProps {
  books: IMightHaveRatingBook[];
  updateBookRating: (book?: IMightHaveRatingBook, rating?: number) => void;
}

function BookList(props:IProps) {
  const {books, updateBookRating} = props;

    return (
      <div className="BookList">
        <table>
        <thead>
          <tr><td>title</td>
          <td>author</td>
          <td>rating</td></tr>
        </thead>
        <tbody>
        {books.map(book=><BookItem book={book} key={book?.isbn} updateBookRating={updateBookRating} />)}
        </tbody>
        </table>
      </div>
    );
  }

  export default BookList;
