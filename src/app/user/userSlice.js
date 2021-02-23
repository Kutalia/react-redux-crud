import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

// automatically generates action creators and reducers, avoids extensive testing
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: () => {
            return initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
