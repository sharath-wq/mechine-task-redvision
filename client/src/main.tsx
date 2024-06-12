import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
// import ErrorBoundary from './pages/errorPage.tsx';

import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        {/* <ErrorBoundary> */}
        <App />
        <Toaster />
        {/* </ErrorBoundary> */}
    </Provider>
);
