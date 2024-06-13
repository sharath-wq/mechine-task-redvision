import { useState, useEffect, useRef, useCallback } from 'react';
import { BookIcon, FilterIcon, TagIcon } from 'lucide-react';
import axios from 'axios';

import { BASE_URL } from '@/constants';

import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Book } from '@/components/book/data-table';
import { Card } from '@/components/ui/card';
import useDebounce from '@/lib/debounce';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cart-slice';
import { useAppSelector } from '@/redux/store';
import { updateCart } from '@/api/cart';

export default function Component() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);

    const [hasMore, setHasMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouce = useDebounce(searchTerm);
    const [books, setBooks] = useState<Book[]>([]);

    const dispatch = useDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        fetchOptions();
    }, []);

    useEffect(() => {
        updateCart(cartItems);
    }, [cartItems]);

    async function fetchBooks() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${BASE_URL}/books`, {
                params: {
                    search: searchTerm ? searchTerm : null,
                    category: selectedCategories,
                    author: selectedAuthors,
                    page: currentPage,
                },
            });
            setBooks((prev) => {
                const newBooks = [...prev, ...data];
                const uniqueBooks = Array.from(new Set(newBooks.map((book) => book.id))).map((id) =>
                    newBooks.find((book) => book.id === id)
                );
                return uniqueBooks;
            });

            setHasMore(data.length > 0);
        } catch (error: any) {
            handleErrorResponse(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setBooks([]);
        setCurrentPage(1);
    }, [debouce, selectedAuthors, selectedCategories]);

    // Fetch available categories and authors from the backend
    async function fetchOptions() {
        try {
            const { data } = await axios.get(`${BASE_URL}/books/options`);
            setAvailableAuthors(data.authors || []);
            setAvailableCategories(data.categories || []);
        } catch (error: any) {
            handleErrorResponse(error);
        }
    }

    // Handle error response from API
    function handleErrorResponse(error: any) {
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

    // Handle category filter change
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    // Handle author filter change
    const handleAuthorChange = (author: string) => {
        setSelectedAuthors((prev) => {
            if (prev.includes(author)) {
                return prev.filter((a) => a !== author);
            } else {
                return [...prev, author];
            }
        });
    };

    useEffect(() => {
        fetchBooks();
    }, [debouce, selectedAuthors, selectedCategories, currentPage]);

    const handleAddToCart = (id: string, price: number, quantity = 1) => {
        dispatch(
            addItem({
                productId: id,
                quantity: quantity,
                price: price,
            })
        );
    };

    const observer = useRef<IntersectionObserver>();
    const lastBookRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isLoading) return; // Check for isLoadingData
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, isLoading, hasMore]
    );

    return (
        <div className='container mx-auto px-4 md:px-6 py-12'>
            <div className='flex items-center justify-end mb-8'>
                <div className='flex items-center gap-4'>
                    <Input
                        type='text'
                        placeholder='Search by title or author'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full max-w-md bg-white dark:bg-gray-950'
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline'>
                                <FilterIcon className='w-4 h-4 mr-2' />
                                Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-64 p-4'>
                            <div className='grid gap-4'>
                                <div>
                                    <h3 className='font-semibold mb-2'>Category</h3>
                                    <div className='grid gap-2'>
                                        {availableCategories &&
                                            availableCategories.map((category) => (
                                                <Label key={category} className='flex items-center gap-2 font-normal'>
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category)}
                                                        onCheckedChange={() => handleCategoryChange(category)}
                                                    />
                                                    {category}
                                                </Label>
                                            ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-semibold mb-2'>Author</h3>
                                    <div className='grid gap-2'>
                                        {availableAuthors &&
                                            availableAuthors.map((author) => (
                                                <Label key={author} className='flex items-center gap-2 font-normal'>
                                                    <Checkbox
                                                        checked={selectedAuthors.includes(author)}
                                                        onCheckedChange={() => handleAuthorChange(author)}
                                                    />
                                                    {author}
                                                </Label>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='flex flex-wrap gap-2 mb-4'>
                {selectedCategories.length > 0 && (
                    <div className='bg-gray-100 dark:bg-gray-950 px-3 py-1 rounded-full text-sm'>
                        Categories: {selectedCategories.join(', ')}
                    </div>
                )}
                {selectedAuthors.length > 0 && (
                    <div className='bg-gray-100 dark:bg-gray-950 px-3 py-1 rounded-full text-sm'>
                        Authors: {selectedAuthors.join(', ')}
                    </div>
                )}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {books.map((book: Book, idx: number) => {
                    return (
                        <Card
                            ref={books.length === idx + 1 ? lastBookRef : null}
                            key={book.id}
                            className='w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900'
                        >
                            <Link to={`/book/${book.id}`}>
                                <img
                                    src={book.imageUrl}
                                    alt='Book Cover'
                                    width={400}
                                    height={600}
                                    className='w-full h-[400px] object-contain'
                                />
                            </Link>
                            <div className='p-6 space-y-4'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold'>
                                        {book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title}
                                    </h3>
                                    <div className='flex justify-between'>
                                        <p className='text-gray-500 dark:text-gray-400'>{book.author}</p>
                                        <div className='top-4 right-4 bg-green-900 text-white px-3 py-1 rounded-full text-sm'>
                                            ₹ {book.price}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                                    <div>
                                        <BookIcon className='w-4 h-4 mr-1 inline' />
                                        <span>{book.pages} pages</span>
                                    </div>
                                    <div>
                                        <TagIcon className='w-4 h-4 mr-1 inline' />
                                        <span>{book.category}</span>
                                    </div>
                                </div>
                                <Button
                                    type='button'
                                    onClick={() => handleAddToCart(book.id, book.price)}
                                    size='lg'
                                    className='w-full'
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    );
                })}
                {isLoading &&
                    [...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className='w-full max-w-sm bg-gray-200 animate-pulse rounded-lg overflow-hidden dark:bg-gray-800'
                        >
                            <div className='w-full h-[400px] bg-gray-300 dark:bg-gray-700' />
                            <div className='p-6 space-y-4'>
                                <div className='w-3/4 h-6 bg-gray-300 dark:bg-gray-700' />
                                <div className='w-1/2 h-4 bg-gray-300 dark:bg-gray-700' />
                                <div className='w-full h-4 bg-gray-300 dark:bg-gray-700' />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
