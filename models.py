# "ISBN";"Book-Title";"Book-Author";"Year-Of-Publication";"Publisher";"Image-URL-S";"Image-URL-M";"Image-URL-L"


class Book():
    def __init__(self,book_df_row):
        self.isbn = book_df_row['ISBN']
        self.title = book_df_row['Book-Title']
        self.author = book_df_row['Book-Author']
        self.yop = book_df_row['Year-Of-Publication']
        self.publisher = book_df_row['Publisher']
        self.image_url_m = book_df_row['Image-URL-M']

