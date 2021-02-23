import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: (state) => {
            return initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
