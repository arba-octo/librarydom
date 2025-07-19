import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    series: []
}

const seriesSlice = createSlice({
    name: "@@series",
    initialState,
    reducers: {
        // Загружает все серии книг из БД в стейт, используется в SideBar
        setSeries: (state, action) => {
            state.series = action.payload;
        }
    }
});

export const {setSeries} = seriesSlice.actions;
export const seriesReducer = seriesSlice.reducer;
export const selectAllSeries = (state) => state.series.series;