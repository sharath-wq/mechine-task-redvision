import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/store';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/redux/user-slice';
import { Loader } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/constants';

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function LoginPage() {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof SigninValidation>) {
        try {
            const { data } = await axios.post(`${BASE_URL}/users/signin`, values);
            toast({
                description: 'Logged In.',
            });

            dispatch(setUser(data));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    const { isSubmitting } = form.formState;
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Card className='w-full max-w-md p-6 rounded-lg shadow-md'>
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>Login to access our wide veriety of books.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Enter your password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='text-center'>
                                <Link to='/signup' className='text-sm  hover:underline'>
                                    Don't have an account? Sign up
                                </Link>
                            </div>
                            <Button className='w-full' type='submit'>
                                {isSubmitting ? <Loader /> : ' Sign in'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
