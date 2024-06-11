import { Link } from 'react-router-dom';

import { BookIcon } from 'lucide-react';

export default function NotfoundPage() {
    return (
        <div className='flex flex-col items-center justify-center h-[100dvh] px-4 md:px-6'>
            <div className='max-w-md text-center space-y-4'>
                <BookIcon className='w-20 h-20 mx-auto text-gray-400 dark:text-gray-600' />
                <h1 className='text-3xl font-bold'>Oops, the page you're looking for is not here</h1>
                <p className='text-gray-500 dark:text-gray-400'>
                    The page you requested could not be found. Please check the URL or return to the homepage.
                </p>
                <Link
                    to={'/'}
                    className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
