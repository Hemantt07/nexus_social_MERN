import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import ScrollButton from './components/ScrollButton';
import SwitchMode from './components/switchMode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
    <AuthContextProvider>
        <App />
        <ScrollButton />
        <SwitchMode />
        <ToastContainer />
    </AuthContextProvider>
);


