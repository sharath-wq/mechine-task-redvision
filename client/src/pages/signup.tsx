import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setUser } from '@/redux/user-slice';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAppDispatch } from '@/redux/store';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Banner from '@/components/banner';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants';

export const SignupValidation = z
    .object({
        name: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export default function SignupPage() {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    axios.defaults.withCredentials = true;
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        try {
            const { data } = await axios.post(`${BASE_URL}/users/signup`, values);
            toast({
                description: 'Account created.',
            });

            dispatch(setUser(data));
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

    const { isSubmitting } = form.formState;

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Card className='w-full max-w-md p-6  rounded-lg shadow-md'>
                <CardHeader>
                    {isVisible && <Banner />}
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to access our book store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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

                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Confrim password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='text-center'>
                                <Link to='/login' className='text-sm hover:underline'>
                                    Already have an account? Log in
                                </Link>
                            </div>
                            <Button className='w-full' type='submit'>
                                {isSubmitting ? <Loader /> : 'Sign Up'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
