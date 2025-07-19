import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    favourites: []
}

const favouritesSlice = createSlice({
    name: "@@favourites",
    initialState,
    reducers: {
        addFavourite(state, { payload }) {
            if (!state.favourites.some(favItem => favItem.id === payload.id)) {
                state.favourites = state.favourites.concat(payload);
            } else {
                return
            };
        },
        removeFavourite(state, { payload }) {
            state.favourites = state.favourites.filter(favItem => favItem.id !== payload.id)
        },
        clearFavourites(state) {
            state.favourites = [];
        }
    }
})
export const favouritesReducer = favouritesSlice.reducer;
export const {addFavourite, removeFavourite, clearFavourites} = favouritesSlice.actions;
export const selectFavourites = (state) => state.favourites.favourites;