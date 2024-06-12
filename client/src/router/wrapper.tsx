import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/redux/store';
import Navbar from '@/components/navbar';
import AdminLayout from '@/pages/admin';

const ProtectedRoutes = () => {
    const currentUser = useAppSelector((state) => state.user);

    if (currentUser.id) {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    }

    return <Navigate to={'/login'} />;
};

const PublicRoutes = () => {
    const currentUser = useAppSelector((state) => state.user);

    if (currentUser.id) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Outlet />
        </div>
    );
};

const AdminRoutes = () => {
    const currentUser = useAppSelector((state) => state.user);

    if (currentUser.role !== 'admin') {
        return <Navigate to={'/'} />;
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </div>
    );
};

export { ProtectedRoutes, PublicRoutes, AdminRoutes };
