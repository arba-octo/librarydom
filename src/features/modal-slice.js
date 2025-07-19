import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modal: false
}

const modalSlice = createSlice({
    name: "@@modal",
    initialState,
    reducers: {
        // Открывает модельное окно
        openModal: (state) => { state.modal = true; },
        closeModal: (state) => { state.modal = false; }
    }
});

export const {openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
export const selectModal = (state) => state.modal.modal;