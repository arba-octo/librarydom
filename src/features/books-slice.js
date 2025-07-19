import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    books: [],
}

const booksSlice = createSlice({
    name: "@@books",
    initialState,
    reducers: {
        // Выгружает в стейт все книги из БД, используется в BooksCatalogPreview
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        // Добавляет новую книгу из формы SideBar, используется в SideBarAddBook
        addBook: (state, action) => {
                const newBook = action.payload;
                if (!state.books.some(bookItem => bookItem.id === action.payload.id)) {
                    state.books = state.books.concat(newBook);
                }
            }
        }
});

export const {setBooks, addBook} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
export const selectBooks = (state) => state.books.books;