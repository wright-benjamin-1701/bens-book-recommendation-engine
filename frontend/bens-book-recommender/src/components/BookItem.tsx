import { ChangeEvent, useCallback } from 'react';
import { IMightHaveRatingBook } from '../types';
import React from 'react';
interface IProps {
    book?: IMightHaveRatingBook;
    updateBookRating: (book?: IMightHaveRatingBook, rating?: number) => void;
}

function BookItem(props: IProps) {
    const { book,updateBookRating } = props;


    const updateBookRatingHandler = useCallback((event:ChangeEvent<HTMLInputElement>) => {

        updateBookRating(book, Math.round(event.target.valueAsNumber));

    } , [book,updateBookRating]
    );


    return (
        <tr className="BookItem">
            
            <td>{book?.title.toLowerCase()}</td>
            <td>{book?.author.toLowerCase()}</td>
            <td>{book?.yop.toLowerCase()}</td>
            <td>
                <input type='range' min={1} max={10} defaultValue={1} onInput={updateBookRatingHandler} />
            </td>
            <td>
                <output>{book?.rating || 'N/A'}</output>
            </td>
    </tr>
    );  
}


export default BookItem;