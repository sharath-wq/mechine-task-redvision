import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface CartState {
    userId: string;
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    userId: '',
    items: [],
    totalPrice: 0,
};

const loadState = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState) as CartState;
    } catch (err) {
        return initialState;
    }
};

const saveState = (state: CartState): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (err) {
        console.log(err);
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: loadState(),
    reducers: {
        setCart: (state, action: PayloadAction<CartState>) => {
            state.userId = action.payload.userId;
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            saveState(state);
        },

        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                existingItem.price += action.payload.price;
            } else {
                state.items.push(action.payload);
            }
            state.totalPrice += action.payload.price;
            saveState(state);
        },

        removeItem: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex((item) => item.productId === action.payload);
            if (itemIndex !== -1) {
                state.totalPrice -= state.items[itemIndex].price;
                state.items.splice(itemIndex, 1);
                saveState(state);
            }
        },

        updateItem: (state, action: PayloadAction<{ productId: string; updatedItem: Partial<CartItem> }>) => {
            const { productId, updatedItem } = action.payload;
            const itemIndex = state.items.findIndex((item) => item.productId === productId);
            if (itemIndex !== -1) {
                const currentItem = state.items[itemIndex];
                if (updatedItem.quantity !== undefined) {
                    state.totalPrice -= currentItem.price;
                    currentItem.quantity = updatedItem.quantity;
                    currentItem.price = (updatedItem.quantity * currentItem.price) / currentItem.quantity;
                    state.totalPrice += currentItem.price;
                }
                if (updatedItem.price !== undefined) {
                    state.totalPrice += updatedItem.price - currentItem.price;
                    currentItem.price = updatedItem.price;
                }
                saveState(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            saveState(state);
        },
    },
});

export const { setCart, addItem, removeItem, updateItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
