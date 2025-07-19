import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    authUser: {}
}

const usersSlice = createSlice({
    name: "@@users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        toAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
});

export const {setUsers, toAuthUser} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectAllUsers = (state) => state.users.users;
export const selectAuthUser = (state) => state.users.authUser;