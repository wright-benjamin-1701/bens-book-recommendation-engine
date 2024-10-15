import axios from "axios";

import {  IMightHaveRatingBook } from ".././types";

const getRecommendations = async (books: IMightHaveRatingBook[]): Promise<IMightHaveRatingBook[]> => {

    const bookURL = `http://localhost:8000/get-recommendations` ;
    console.log(books);
    const response = await axios.post(bookURL, books );

    return response.data as IMightHaveRatingBook[] ;
}

    


export default getRecommendations;