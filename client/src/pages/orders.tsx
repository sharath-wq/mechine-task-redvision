import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function OrderPage() {
    const [orders, setOrders] = useState([
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            quantity: 2,
            orderDate: '2023-04-15',
            total: 29.98,
            image: '/placeholder.svg',
        },
        {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            quantity: 1,
            orderDate: '2023-03-22',
            total: 14.99,
            image: '/placeholder.svg',
        },
        {
            id: 3,
            title: "Harry Potter and the Sorcerer's Stone",
            author: 'J.K. Rowling',
            quantity: 3,
            orderDate: '2023-02-10',
            total: 44.97,
            image: '/placeholder.svg',
        },
        {
            id: 4,
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            quantity: 1,
            orderDate: '2023-01-05',
            total: 12.99,
            image: '/placeholder.svg',
        },
        {
            id: 5,
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            quantity: 2,
            orderDate: '2022-12-20',
            total: 23.98,
            image: '/placeholder.svg',
        },
    ]);
    return (
        <div className='container mx-auto px-4 md:px-6 py-12'>
            <div className='flex flex-col items-center mb-8'>
                <h1 className='text-3xl font-bold mb-2'>My Orders</h1>
                <p className='text-gray-500 dark:text-gray-400 text-center'>View and manage your past orders.</p>
            </div>
            <div className='space-y-4'>
                {orders.map((order) => (
                    <div key={order.id} className='bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden'>
                        <div className='flex'>
                            <img
                                src='/placeholder.svg'
                                alt={order.title}
                                width={100}
                                height={150}
                                className='w-24 h-36 object-cover'
                            />
                            <div className='flex-1 p-4 space-y-2'>
                                <h3 className='text-lg font-bold truncate'>{order.title}</h3>
                                <p className='text-gray-500 dark:text-gray-400 truncate'>{order.author}</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-gray-500 dark:text-gray-400'>Quantity: {order.quantity}</p>
                                    <p className='text-gray-500 dark:text-gray-400'>Total: ${order.total.toFixed(2)}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-gray-500 dark:text-gray-400'>Order Date: {order.orderDate}</p>
                                    <Button variant='outline' size='sm'>
                                        View Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
