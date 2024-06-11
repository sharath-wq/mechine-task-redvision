import { useState, useMemo, ChangeEvent } from 'react';
import { FilterIcon } from 'lucide-react';

import { books } from '@/constants';

import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
// import { Pagination } from '@/components/ui/pagination';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    price: number;
}

export default function Component() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [booksPerPage] = useState<number>(12);

    const filteredBooks = useMemo(() => {
        let filtered = books.filter((book: Book) => {
            const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            const authorMatch = book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(book.category);
            const authorMatch2 = selectedAuthors.length === 0 || selectedAuthors.includes(book.author);
            return titleMatch || (authorMatch && categoryMatch && authorMatch2);
        });
        return filtered;
    }, [searchTerm, selectedCategories, selectedAuthors]);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleAuthorChange = (author: string) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleAddToCart = (book: Book) => {
        console.log(`Added ${book.title} to cart`);
    };

    return (
        <div className='container mx-auto px-4 md:px-6 py-12'>
            <div className='flex items-center justify-end mb-8'>
                <div className='flex items-center gap-4'>
                    <Input
                        type='text'
                        placeholder='Search by title or author'
                        value={searchTerm}
                        onChange={handleSearch}
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
                                        {['Fiction', 'Self-Help', 'Memoir', 'History', 'Non-Fiction'].map((category) => (
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
                                        {[
                                            'F. Scott Fitzgerald',
                                            'Harper Lee',
                                            'James Clear',
                                            'Paulo Coelho',
                                            'Tara Westover',
                                        ].map((author) => (
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
                {currentBooks.map((book) => (
                    <div key={book.id} className='bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden'>
                        <Link to='#'>
                            <img
                                src='/placeholder.svg'
                                alt={book.title}
                                width={300}
                                height={400}
                                className='w-full h-[400px] object-cover'
                            />
                        </Link>
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold mb-2'>
                                <Link to='#'>{book.title}</Link>
                            </h3>
                            <p className='text-gray-500 dark:text-gray-400 mb-4'>{book.author}</p>
                            <div className='flex items-center justify-between'>
                                <p className='text-xl font-bold'>${book.price}</p>
                                <Button onClick={() => handleAddToCart(book)}>Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-8'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink>{currentPage}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
