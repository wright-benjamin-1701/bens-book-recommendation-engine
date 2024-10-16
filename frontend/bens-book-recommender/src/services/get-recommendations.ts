import axios from "axios";

import {  IBook } from ".././types";

const shuffle = (array: IBook[]) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

const getRecommendations = async (books: IBook[]): Promise<IBook[]> => {

    const bookURL = `http://localhost:8000/get-recommendations` ;
    
    const response = await axios.post(bookURL, books );
    console.log(response.data);

    return shuffle(response.data).slice(0,7) as IBook[] ;
}

    


export default getRecommendations;