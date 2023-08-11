import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import ScrollButton from './components/ScrollButton';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
    <AuthContextProvider>
        <App />
        <ScrollButton />
    </AuthContextProvider>
);


