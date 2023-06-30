import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);


