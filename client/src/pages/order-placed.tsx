import { CheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function OrderPlacedPage() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen px-4 py-8 dark:bg-gray-900'>
            {showConfetti && <Confetti width={windowDimensions.width} height={windowDimensions.height} />}
            <div className='relative w-full max-w-md px-4 py-12 bg-white rounded-lg shadow-lg dark:bg-gray-800'>
                <div className='absolute inset-0 pointer-events-none' />
                <div className='flex flex-col items-center space-y-4'>
                    <CheckIcon className='w-12 h-12 text-green-500' />
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>Order Placed</h1>
                    <p className='text-gray-600 dark:text-gray-400'>
                        Congratulations! Your order has been placed successfully.
                    </p>
                    <Link
                        to={'/orders'}
                        className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300'
                    >
                        Go to Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
