


export interface IBook {
    isbn: string;
    title: string;
    author: string;
    yop: string;
}


export interface IMightHaveRatingBook extends IBook {
    rating?: number;

}
