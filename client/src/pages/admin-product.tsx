import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
    return (
        <div className='max-w-6xl ml-5 px-2 py-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Books</h1>
                <Link
                    className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap'
                    to={'/admin/product/add'}
                >
                    Add Book
                </Link>
            </div>
            <div className='overflow-auto rounded-lg border shadow-sm mt-6'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[80px]'>Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className='text-right'>Price</TableHead>
                            <TableHead className='text-right'>Pages</TableHead>
                            <TableHead>Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <img
                                    src='/placeholder.svg'
                                    width={64}
                                    height={64}
                                    alt='Book Cover'
                                    className='aspect-square rounded-md object-cover'
                                />
                            </TableCell>
                            <TableCell className='font-medium'>The Great Gatsby</TableCell>
                            <TableCell>F. Scott Fitzgerald</TableCell>
                            <TableCell className='text-right'>$12.99</TableCell>
                            <TableCell className='text-right'>180</TableCell>
                            <TableCell>Fiction</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <img
                                    src='/placeholder.svg'
                                    width={64}
                                    height={64}
                                    alt='Book Cover'
                                    className='aspect-square rounded-md object-cover'
                                />
                            </TableCell>
                            <TableCell className='font-medium'>To Kill a Mockingbird</TableCell>
                            <TableCell>Harper Lee</TableCell>
                            <TableCell className='text-right'>$9.99</TableCell>
                            <TableCell className='text-right'>281</TableCell>
                            <TableCell>Fiction</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <img
                                    src='/placeholder.svg'
                                    width={64}
                                    height={64}
                                    alt='Book Cover'
                                    className='aspect-square rounded-md object-cover'
                                />
                            </TableCell>
                            <TableCell className='font-medium'>1984</TableCell>
                            <TableCell>George Orwell</TableCell>
                            <TableCell className='text-right'>$7.99</TableCell>
                            <TableCell className='text-right'>328</TableCell>
                            <TableCell>Fiction</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <img
                                    src='/placeholder.svg'
                                    width={64}
                                    height={64}
                                    alt='Book Cover'
                                    className='aspect-square rounded-md object-cover'
                                />
                            </TableCell>
                            <TableCell className='font-medium'>The Catcher in the Rye</TableCell>
                            <TableCell>J.D. Salinger</TableCell>
                            <TableCell className='text-right'>$8.99</TableCell>
                            <TableCell className='text-right'>214</TableCell>
                            <TableCell>Fiction</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <img
                                    src='/placeholder.svg'
                                    width={64}
                                    height={64}
                                    alt='Book Cover'
                                    className='aspect-square rounded-md object-cover'
                                />
                            </TableCell>
                            <TableCell className='font-medium'>Pride and Prejudice</TableCell>
                            <TableCell>Jane Austen</TableCell>
                            <TableCell className='text-right'>$11.99</TableCell>
                            <TableCell className='text-right'>279</TableCell>
                            <TableCell>Fiction</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
