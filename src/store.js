import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {searchReducer} from "../../dev/library/library-dom/src/features/search/search-slice";
import {favouritesReducer} from '../../dev/library/library-dom/src/features/favourites/favourites-slice';
import {booksReducer} from "../../dev/library/library-dom/src/features/books-slice";
import {seriesReducer} from "../../dev/library/library-dom/src/features/series-slice";
import {usersReducer} from "../../dev/library/library-dom/src/features/users-slice";
import {modalReducer} from "../../dev/library/library-dom/src/features/modal-slice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favourites'],
};
const persistedReducer = persistReducer(persistConfig, favouritesReducer);

export const store = configureStore({
    reducer: {
        search: searchReducer,
        books: booksReducer,
        series: seriesReducer,
        users: usersReducer,
        favourites: persistedReducer,
        modal: modalReducer,
    },
})

export const persistor = persistStore(store);