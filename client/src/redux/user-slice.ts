import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    displayName: string | null;
    email: string | null;
}

const initialState: UserState = {
    id: null,
    displayName: null,
    email: null,
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return initialState;
    }
};

const saveState = (state: UserState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (err) {
        console.log(err);
    }
};

const clearState = () => {
    try {
        localStorage.removeItem('userState');
    } catch (err) {
        console.log(err);
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState: loadState(),
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            const newState = { ...state, ...action.payload };
            saveState(newState);
            return newState;
        },
        clearUser: () => {
            clearState();
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
