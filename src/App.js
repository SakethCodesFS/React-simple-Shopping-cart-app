import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import Header from './components/Header';
import FlashMessage from './components/FlashMessage';
import { CartContext } from './context/CartContext';

const App = () => {
  const { flashMessage, closeFlashMessage } = useContext(CartContext);

  return (
    <>
      <Header />
      <FlashMessage message={flashMessage} onClose={closeFlashMessage} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
