import axios from "axios";

import { IBook } from ".././types";

const getTopBooks = async () => {

    const bookURL = `http://localhost:8000/top-books` ;
    const response = await axios.get(bookURL);

    return response.data as IBook[] ;
}

    


export default getTopBooks;