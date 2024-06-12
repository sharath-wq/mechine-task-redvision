import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { toast } from '../ui/use-toast';
import { useAppDispatch } from '@/redux/store';
import { removeBook } from '@/redux/book-slice';

export default function DeleteModel({ id }: { id: string }) {
    const dispatch = useAppDispatch();

    axios.defaults.withCredentials = true;
    async function handleDelete(id: string) {
        try {
            const { data } = await axios.delete(`${BASE_URL}/books/${id}`);

            dispatch(removeBook(data.id));

            toast({
                description: 'Book Deleted',
            });
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
        <Dialog>
            <DialogTrigger asChild>
                <span className='text-destructive' role='button'>
                    Delete
                </span>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[420px]'>
                <DialogHeader>
                    <DialogTitle>Delete Book</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this book?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div>
                            <Button variant='outline'>Cancel</Button>
                        </div>
                    </DialogClose>
                    <Button type='button' onClick={() => handleDelete(id)} variant='destructive'>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
