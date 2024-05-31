import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);
