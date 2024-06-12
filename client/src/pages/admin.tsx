import { Link, useLocation } from 'react-router-dom';
import { BookIcon, LogOut, PackageIcon, ShoppingCartIcon } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();

    const getLinkClass = (path: string) => {
        const baseClass = 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all';
        const activeClass = 'text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50';
        const inactiveClass = 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50';

        return pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    return (
        <div className='grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
                <div className='flex h-full max-h-screen flex-col gap-2'>
                    <div className='flex h-[60px] items-center border-b px-6'>
                        <Link to={'/admin'} className='flex items-center gap-2 font-semibold'>
                            <BookIcon className='h-6 w-6' />
                            <span className=''>Bookstore Admin</span>
                        </Link>
                    </div>
                    <div className='flex-1 overflow-auto py-2'>
                        <nav className='grid items-start px-4 text-sm font-medium'>
                            <Link to={'/admin/products'} className={getLinkClass('/admin/products')}>
                                <PackageIcon className='h-4 w-4' />
                                Products
                            </Link>
                            <Link to={'/admin/orders'} className={getLinkClass('/admin/orders')}>
                                <ShoppingCartIcon className='h-4 w-4' />
                                Orders
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
                    <Link to={'#'} className='lg:hidden'>
                        <BookIcon className='h-6 w-6' />
                        <span className='sr-only'>Home</span>
                    </Link>
                    <div className='flex-1'>
                        <h1 className='font-semibold text-lg'>Bookstore Management</h1>
                    </div>
                    <div className='flex flex-1 items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4'>
                        <Link
                            to={'/'}
                            className='relative flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-100 rounded-full px-5 py-2'
                        >
                            <LogOut className='h-4 w-4' />
                            <span>Exit</span>
                        </Link>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
