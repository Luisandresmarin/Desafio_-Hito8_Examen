import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Si usas Bootstrap.
import { CartProvider } from './context/CartContext'; 
import { PizzaProvider } from './context/PizzaContext'; 
import GlobalProvider from './context/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GlobalProvider>
            <PizzaProvider> 
                <CartProvider>
                    <App />
                </CartProvider> 
            </PizzaProvider> 
        </GlobalProvider> 
    </BrowserRouter>,
);