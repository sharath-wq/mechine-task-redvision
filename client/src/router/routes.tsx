import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoutes, PublicRoutes } from './wrapper';
import NotfoundPage from '@/pages/not-found';
import CartPage from '@/pages/cart';
import OrderPage from '@/pages/orders';

export default function Router() {
    return (
        <Routes>
            <Route path='' element={<ProtectedRoutes />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/orders' element={<OrderPage />} />
            </Route>

            <Route path='' element={<PublicRoutes />}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Route>

            <Route path='*' element={<NotfoundPage />} />
        </Routes>
    );
}
