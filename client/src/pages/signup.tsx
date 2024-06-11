import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function SignupPage() {
    return (
        <div className='mx-auto max-w-[400px] space-y-6 py-12'>
            <div className='space-y-2 text-center'>
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <p className='text-gray-500 dark:text-gray-400'>Create an account to access our book store.</p>
            </div>
            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' placeholder='John Doe' required />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' placeholder='m@example.com' required />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' type='password' required />
                </div>
                <Button type='submit' className='w-full'>
                    Sign Up
                </Button>
                <div className='text-center text-sm'>
                    Already have an account?{' '}
                    <Link to='/login' className='underline'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
