import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface Book {
    id: number;
    image: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

export default function CartPage() {
    const books: Book[] = [
        {
            id: 1,
            image: '/placeholder.svg',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 14.99,
            quantity: 1,
        },
        {
            id: 2,
            image: '/placeholder.svg',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 12.99,
            quantity: 2,
        },
        {
            id: 3,
            image: '/placeholder.svg',
            title: '1984',
            author: 'George Orwell',
            price: 9.99,
            quantity: 1,
        },
    ];

    const [cart, setCart] = useState<Book[]>(books);

    const handleRemoveFromCart = (id: number) => {
        setCart(cart.filter((book) => book.id !== id));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setCart(cart.map((book) => (book.id === id ? { ...book, quantity } : book)));
    };

    const total = cart.reduce((acc, book) => acc + book.price * book.quantity, 0);

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
                    {cart.map((book) => (
                        <div key={book.id} className='grid md:grid-cols-[120px_1fr_auto] gap-4 items-center'>
                            <img
                                src='/placeholder.svg'
                                alt={book.title}
                                width={120}
                                height={180}
                                className='rounded-lg object-cover'
                            />
                            <div className='grid gap-1'>
                                <h3 className='font-semibold'>{book.title}</h3>
                                <p className='text-gray-500 dark:text-gray-400'>{book.author}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        onClick={() => handleQuantityChange(book.id, book.quantity - 1)}
                                    >
                                        <MinusIcon className='h-4 w-4' />
                                    </Button>
                                    <span>{book.quantity}</span>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        onClick={() => handleQuantityChange(book.id, book.quantity + 1)}
                                    >
                                        <PlusIcon className='h-4 w-4' />
                                    </Button>
                                </div>
                                <div className='text-lg font-semibold'>${(book.price * book.quantity).toFixed(2)}</div>
                                <Button variant='outline' size='icon' onClick={() => handleRemoveFromCart(book.id)}>
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
