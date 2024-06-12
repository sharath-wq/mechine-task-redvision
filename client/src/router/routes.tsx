import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import { Routes, Route } from 'react-router-dom';

import { AdminRoutes, ProtectedRoutes, PublicRoutes } from './wrapper';
import NotfoundPage from '@/pages/not-found';
import CartPage from '@/pages/cart';
import OrderPage from '@/pages/orders';
import AdminProductsPage from '@/pages/admin-product';
import AdminOrdersPage from '@/pages/admin-orders';
import AddProduct from '@/pages/add-product';
import EditProduct from '@/pages/editProduct';
import BookPage from '@/pages/book-view';
import OrderPlacedPage from '@/pages/order-placed';

export default function Router() {
    return (
        <Routes>
            <Route path='' element={<ProtectedRoutes />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/orders' element={<OrderPage />} />
                <Route path='/book/:id' element={<BookPage />} />
                <Route path='/order/placed' element={<OrderPlacedPage />} />
            </Route>

            <Route path='' element={<PublicRoutes />}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Route>

            <Route path='' element={<AdminRoutes />}>
                <Route path='/admin/products' element={<AdminProductsPage />} />
                <Route path='/admin/orders' element={<AdminOrdersPage />} />
                <Route path='/admin/product/add' element={<AddProduct />} />
                <Route path='/admin/product/:id' element={<EditProduct />} />
                <Route path='/admin/book/:id' element={<BookPage />} />
            </Route>

            <Route path='*' element={<NotfoundPage />} />
        </Routes>
    );
}
