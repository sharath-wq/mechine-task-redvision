import { BASE_URL } from '@/constants';
import axios from 'axios';

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

axios.defaults.withCredentials = true;
async function updateCart(items: CartItem[]) {
    try {
        const { data } = await axios.put(`${BASE_URL}/cart`, {
            items,
        });
        return data;
    } catch (error: any) {
        return error;
    }
}

async function clearCart(id: string) {
    try {
        const { data } = await axios.put(`${BASE_URL}/cart/${id}`, {
            items: [],
        });
        return data;
    } catch (error: any) {
        return error;
    }
}

async function getCart(id: string) {
    try {
        const { data } = await axios.get(`${BASE_URL}/cart/${id}`);
        return data;
    } catch (error: any) {
        return error;
    }
}

export { getCart, updateCart, clearCart };
