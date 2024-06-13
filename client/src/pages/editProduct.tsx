import { z } from 'zod';
import { useEffect, useState } from 'react';
import CloudinaryUploadWidget from '../context/cld-ctx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, IMAGEUPLOADCONFIG, categories } from '@/constants';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProductValidation } from '@/lib/validations';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/store';
import { updateBook } from '@/redux/book-slice';

export default function EditProduct() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof addProductValidation>>({
        resolver: zodResolver(addProductValidation),
        defaultValues: {
            title: '',
            author: '',
            price: 0,
            pages: 0,
            category: '',
            quantity: 0,
        },
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    useEffect(() => {
        async function getBooks() {
            try {
                const { data } = await axios.get(`${BASE_URL}/books/${id}`);
                setImageUrl(data.imageUrl);
                reset(data);
                /**
                 * TODO: Fix defualt value not wokring
                 */
                form.setValue('category', data.category);
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

        if (id) {
            getBooks();
        }
    }, [id, reset]);

    axios.defaults.withCredentials = true;
    async function onSubmit(values: z.infer<typeof addProductValidation>) {
        try {
            const { data } = await axios.put(`${BASE_URL}/books/${id}`, {
                ...values,
                imageUrl,
            });

            dispatch(updateBook(data));

            toast({
                description: 'Book updated successfully.',
            });

            navigate('/admin/products', { replace: true });
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

    return (
        <div className='flex flex-col items-center justify-center h-[95%] px-4 py-8 bg-gray-100 dark:bg-gray-900'>
            <div className='w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8'>
                <h1 className='text-2xl font-bold mb-4 dark:text-white'>Edit Product</h1>
                <p className='text-gray-500 dark:text-gray-400 mb-6'>Fill out the form below to update the product.</p>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Title' type='text' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='author'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Author' type='text' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Price'
                                                type='number'
                                                {...field}
                                                onChange={(event) => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='pages'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pages</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Pages'
                                                type='number'
                                                {...field}
                                                onChange={(event) => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select a category' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Quantity'
                                                type='number'
                                                {...field}
                                                onChange={(event) => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2 col-span-2'>
                            <Label htmlFor='image'>Image</Label>
                            {imageUrl === '' ? (
                                <div className='flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer dark:border-gray-600'>
                                    <div className='text-center'>
                                        <CloudinaryUploadWidget setImageUrl={setImageUrl} uwConfig={IMAGEUPLOADCONFIG} />
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col justify-center gap-2 items-center'>
                                    <img src={imageUrl} alt='Uploaded product' className='max-h-44 mx-auto' />
                                    <Button
                                        onClick={() => {
                                            setImageUrl('');
                                        }}
                                        type='button'
                                        variant={'destructive'}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className='mt-6 flex justify-start'>
                            <Button type='submit'>{isSubmitting ? <Loader /> : 'Save Product'}</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
