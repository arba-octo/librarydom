import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { searchReducer } from '@/features/search/search-slice';
import { favouritesReducer } from '@/features/favourites/favourites-slice';
import { booksReducer } from '@/features/books-slice';
import { seriesReducer } from '@/features/series-slice';
import { usersReducer } from '@/features/users-slice';
import { modalReducer } from '@/features/modal-slice';

// Создаём общий rootReducer
const rootReducer = combineReducers({
    search: searchReducer,
    books: booksReducer,
    series: seriesReducer,
    users: usersReducer,
    favourites: favouritesReducer,
    modal: modalReducer,
});

// Конфиг для persist (только favourites)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favourites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);