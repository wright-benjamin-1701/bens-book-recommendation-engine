import { IMightHaveRatingBook } from "../types";


interface IProps {
    book: IMightHaveRatingBook,

}


function BookItem(props:IProps) {
    const { book } = props;

    return (
        <tr className="BookItem">
            <td> {book.title}</td>
            <td>{book.author}</td>
            <td><input onChange = {(val)=>console.log(val.target.value)} type="range" min={0} max={10} defaultValue={0}/></td>
            
    
        </tr>
    );  
  }
  
  export default BookItem;
  