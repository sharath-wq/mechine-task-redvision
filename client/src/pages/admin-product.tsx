import axios from 'axios';
import { Link } from 'react-router-dom';

import { Book, BookDataTable } from '@/components/book/data-table';
import { toast } from '@/components/ui/use-toast';
import { BASE_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setBooks } from '@/redux/book-slice';

export default function AdminProductsPage() {
    const [data, setData] = useState<Book[]>();

    const dispatch = useAppDispatch();

    async function fetchBooks() {
        try {
            const { data } = await axios.get(`${BASE_URL}/books`);
            dispatch(setBooks(data));
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
        fetchBooks();
    }, []);

    return (
        <div className='w-max-6xl ml-5 px-2 py-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Books</h1>
                <Link
                    className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap'
                    to='/admin/product/add'
                >
                    Add Book
                </Link>
            </div>
            <div className=' mt-6'>
                <BookDataTable />
            </div>
        </div>
    );
}
