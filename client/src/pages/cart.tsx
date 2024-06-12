import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { removeItem, updateItem } from '@/redux/cart-slice';
import { updateCart } from '@/api/cart';

interface Cart {
    userId: string;
    items: Item[];
    totalPrice: number;
    id: string;
}

interface Item {
    productId: Product;
    quantity: number;
    price: number;
}

interface Product {
    title: string;
    author: string;
    price: number;
    pages: number;
    category: string;
    imageUrl: string;
    quantity: number;
    id: string;
}

export default function CartPage() {
    const [cart, setCart] = useState<Cart>();

    const cartItems = useAppSelector((state) => state.cart.items);

    const dispatch = useAppDispatch();

    async function fetchCart() {
        try {
            const { data } = await axios.get(`${BASE_URL}/cart`);
            setCart(data);
        } catch (error: any) {
            let errorMessage = 'There was a problem with your request.';

            if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
                errorMessage = error.response.data.errors.map((err: { message: string }) => err.message).join(', ');
            }

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: errorMessage,
            });
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemoveFromCart = (id: string) => {
        setCart((prevCart) => {
            if (!prevCart) return prevCart;
            const updatedItems = prevCart.items.filter((item) => item.productId.id !== id);
            return { ...prevCart, items: updatedItems };
        });
        dispatch(removeItem(id));
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) return; // Do not allow quantity less than 1
        setCart((prevCart) => {
            if (!prevCart) return prevCart;
            const updatedItems = prevCart.items.map((item) =>
                item.productId.id === id ? { ...item, quantity: quantity } : item
            );
            return { ...prevCart, items: updatedItems };
        });
        dispatch(updateItem({ productId: id, updatedItem: { quantity: quantity } }));
    };

    useEffect(() => {
        updateCart(cartItems);
    }, [cartItems]);

    const total = cart?.items.reduce((acc, book) => acc + book.price * book.quantity, 0) || 0;

    return (
        <section className='w-full py-12'>
            <div className='container grid gap-6 md:gap-8 px-4 md:px-6 max-w-4xl mx-auto'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8'>
                    <div className='grid gap-1'>
                        <h1 className='text-2xl font-bold tracking-tight'>Cart</h1>
                        <p className='text-gray-500 dark:text-gray-400'>Review your items and proceed to checkout.</p>
                    </div>
                </div>
                <div className='grid gap-6'>
                    {cart?.items.map((book: Item) => (
                        <div key={book.productId.id} className='grid md:grid-cols-[120px_1fr_auto] gap-4 items-center'>
                            <img
                                src={book.productId.imageUrl}
                                alt={book.productId.title}
                                width={120}
                                height={180}
                                className='rounded-lg object-cover'
                            />
                            <div className='grid gap-1'>
                                <h3 className='font-semibold'>{book.productId.title}</h3>
                                <p className='text-gray-500 dark:text-gray-400'>{book.productId.author}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        onClick={() => handleQuantityChange(book.productId.id, book.quantity - 1)}
                                    >
                                        <MinusIcon className='h-4 w-4' />
                                    </Button>
                                    <span>{book.quantity}</span>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        type='button'
                                        onClick={() => handleQuantityChange(book.productId.id, book.quantity + 1)}
                                    >
                                        <PlusIcon className='h-4 w-4' />
                                    </Button>
                                </div>
                                <div className='text-lg font-semibold'>${(book.price * book.quantity).toFixed(2)}</div>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    type='button'
                                    onClick={() => handleRemoveFromCart(book.productId.id)}
                                >
                                    <TrashIcon className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='grid gap-4 md:gap-6 border-t pt-6 md:pt-8'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold'>Total</p>
                        <p className='text-2xl font-bold'>${total.toFixed(2)}</p>
                    </div>
                    <Button size='lg' className='w-full'>
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </section>
    );
}
