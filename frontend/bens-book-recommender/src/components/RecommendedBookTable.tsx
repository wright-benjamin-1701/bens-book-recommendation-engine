import React from 'react';

interface Book {
  title: string;
  author: string;
  yop:string;
  isbn: string;
}

const RecommendedBookTable = (props: { books: Book[] }) => {
  return (
    <div className="RecommendedBookTable">
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>year</th>
        </tr>
      </thead>
      <tbody>
        {props.books.map((book) => (
          <tr key={book.isbn}>
            <td>{book.title.toLowerCase()}</td>
            <td>{book.author.toLowerCase()}</td>
            <td>{book.yop.toLowerCase()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default RecommendedBookTable;
