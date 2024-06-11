import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoutes, PublicRoutes } from './wrapper';
import NotfoundPage from '@/pages/not-found';

export default function Router() {
    return (
        <Routes>
            <Route path='' element={<ProtectedRoutes />}>
                <Route path='/' element={<HomePage />} />
            </Route>

            <Route path='' element={<PublicRoutes />}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Route>

            <Route path='*' element={<NotfoundPage />} />
        </Routes>
    );
}
