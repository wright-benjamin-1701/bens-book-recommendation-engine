import { IMightHaveRatingBook } from "../types";
import BookItem from "./BookItem";

interface IProps {
  books: IMightHaveRatingBook[];
}

function BookList(props:IProps) {
  const {books} = props
    return (
      <div className="BookList">
        <table>
        <thead>
          <tr><td>Title</td>
          <td>Author</td>
          <td>Rating</td></tr>
        </thead>
        <tbody>
        {books.map(book=><BookItem book={book} key={book.isbn} />)}
        </tbody>
        </table>
      </div>
    );
  }

  export default BookList;
