import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    role: string;
    email: string;
    id:number;
}

interface LoginState {
    value: boolean;
    token: string | null;
    user: User | null;
}

const initialState: LoginState = {
    value: localStorage.getItem('login') === 'true',
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
};
//functions that take the current state and an action as arguments, and return a new state result
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; user: User }>) => {
            localStorage.setItem('login', 'true');
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.value = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            localStorage.removeItem('login');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.value = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;