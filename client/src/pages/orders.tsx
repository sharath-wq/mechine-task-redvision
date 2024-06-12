import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { BASE_URL } from '@/constants';

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

interface OrderItem {
    productId: Product;
    quantity: number;
    price: number;
}

interface Order {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    id: string;
}

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    async function fetchOrders() {
        try {
            const { data } = await axios.get(`${BASE_URL}/orders`);
            setOrders(data);
            console.log(data);
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
        fetchOrders();
    }, []);

    return (
        <div className='container mx-auto px-4 md:px-6 py-12'>
            <div className='flex flex-col items-center mb-8'>
                <h1 className='text-3xl font-bold mb-2'>My Orders</h1>
                <p className='text-gray-500 dark:text-gray-400 text-center'>View and manage your past orders.</p>
            </div>
            <div className='space-y-4'>
                {orders.length
                    ? orders.map((order) => (
                          <div key={order.id} className='bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden'>
                              <div className='p-4'>
                                  <h2 className='text-xl font-bold mb-4'>Order ID: {order.id}</h2>
                                  <div className='space-y-4'>
                                      {order.items.map((item) => (
                                          <div key={item.productId.id} className='flex'>
                                              <img
                                                  src={item.productId.imageUrl || '/placeholder.svg'}
                                                  alt={item.productId.title}
                                                  width={100}
                                                  height={150}
                                                  className='w-24 h-36 object-cover'
                                              />
                                              <div className='flex-1 p-4 space-y-2'>
                                                  <h3 className='text-lg font-bold truncate'>{item.productId.title}</h3>
                                                  <p className='text-gray-500 dark:text-gray-400 truncate'>
                                                      {item.productId.author}
                                                  </p>
                                                  <div className='flex items-center justify-between'>
                                                      <p className='text-gray-500 dark:text-gray-400'>
                                                          Quantity: {item.quantity}
                                                      </p>
                                                      <p className='text-gray-500 dark:text-gray-400'>
                                                          Price: ${item.price.toFixed(2)}
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                                  <div className='flex items-center justify-between mt-4'>
                                      <p className='text-gray-500 dark:text-gray-400'>
                                          Total Price: ${order.totalPrice.toFixed(2)}
                                      </p>
                                      <Button variant='outline' size='sm'>
                                          View Order
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      ))
                    : 'No orders'}
            </div>
        </div>
    );
}
