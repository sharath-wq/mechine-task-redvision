import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    pages: number;
    category: string;
    imageUrl: string;
    quantity: number;
}

export interface BookState {
    books: Book[];
}

const initialState: BookState = {
    books: [],
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('bookState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return initialState;
    }
};

const saveState = (state: BookState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('bookState', serializedState);
    } catch (err) {
        console.log(err);
    }
};

export const booksSlice = createSlice({
    name: 'books',
    initialState: loadState(),
    reducers: {
        setBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload;
        },

        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
            saveState(state);
        },

        removeBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((book: Book) => book.id !== action.payload);
        },

        updateBook: (state, action: PayloadAction<{ id: string; updatedBook: Partial<Book> }>) => {
            const { id, updatedBook } = action.payload;
            const bookIndex = state.books.findIndex((book: Book) => book.id === id);
            if (bookIndex !== -1) {
                state.books[bookIndex] = { ...state.books[bookIndex], ...updatedBook };
            }
        },
    },
});

export const { addBook, removeBook, setBooks, updateBook } = booksSlice.actions;

export default booksSlice.reducer;
