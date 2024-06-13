import { Alert, AlertDescription } from './ui/alert';

const Banner = () => {
    return (
        <Alert variant='default' className='border-yellow-500 p-2'>
            <AlertDescription className='text-xxs'>
                You are using the free tier of Render, which may cause an initial delay when calling APIs. Please wait up to
                5 minutes from your first API call for the application to become fully active. Thank you for your
                understanding.
            </AlertDescription>
        </Alert>
    );
};

export default Banner;
