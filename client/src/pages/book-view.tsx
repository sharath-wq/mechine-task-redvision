import { Book } from '@/components/book/data-table';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { BASE_URL } from '@/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function BookPage() {
    const { id } = useParams();
    const { pathname } = useLocation();

    const [book, setBook] = useState<Book>();

    async function getBooks() {
        try {
            const { data } = await axios.get(`${BASE_URL}/books/${id}`);
            setBook(data);
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
        getBooks();
    }, [id]);

    return (
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid md:grid-cols-2 gap-8 items-start'>
                <div className='flex justify-center'>
                    <img
                        src={book?.imageUrl}
                        alt='Book Cover'
                        width={400}
                        height={600}
                        className='w-full max-w-[300px] md:max-w-none rounded-lg shadow-lg'
                    />
                </div>
                <div className='grid gap-6'>
                    <div>
                        <h1 className='text-3xl font-bold'>{book?.title}</h1>
                        <p className='text-gray-500 dark:text-gray-400'>by {book?.author}</p>
                    </div>
                    <div className='grid gap-2'>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500 dark:text-gray-400'>Category:</span>
                            <span className='font-medium'>{book?.category}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500 dark:text-gray-400'>Number of Pages:</span>
                            <span className='font-medium'>{book?.pages}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500 dark:text-gray-400'>Price:</span>
                            <span className='text-2xl font-bold'>₹ {book?.price}</span>
                        </div>
                    </div>
                    {pathname.split('/')[1] !== 'admin' && (
                        <div className='flex gap-4'>
                            <Button size='lg' className='w-full'>
                                Add to Cart
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
