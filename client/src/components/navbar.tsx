import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookIcon, LogOut, ShoppingCartIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BASE_URL } from '@/constants';
import { toast } from '@/components/ui/use-toast';
import { clearUser } from '@/redux/user-slice';

export default function Navbar() {
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            await axios.post(`${BASE_URL}/users/signout`);

            toast({
                description: 'Logged out.',
            });

            dispatch(clearUser());
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
    };

    return (
        <header className='flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950'>
            <Link to={'/'} className='flex items-center gap-2'>
                <BookIcon className='h-6 w-6' />
                <span className='text-lg font-semibold'>Book Store</span>
            </Link>
            <div className='flex items-center gap-4'>
                <Link to={'/cart'} className='relative'>
                    <ShoppingCartIcon className='h-8 w-8' />
                    <Badge className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                        3
                    </Badge>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='h-9 w-9'>
                            <img src={'https://avatars.githubusercontent.com/u/124599?v=4'} alt='@shadcn' />
                            <AvatarFallback>JP</AvatarFallback>
                            <span className='sr-only'>Toggle user menu</span>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                            <Link to={'/orders'}>Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className='mr-2 h-4 w-4' />
                            <span onClick={handleLogOut}>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
