import React, { createContext, useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../context/localStorageHelper';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadFromLocalStorage('cart') || []);
  const [products, setProducts] = useState(loadFromLocalStorage('products') || []);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    saveToLocalStorage('cart', cart);
    saveToLocalStorage('products', products);
  }, [cart, products]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });
    setFlashMessage('Product added to cart');
  };

  const clearCart = () => {
    setCart([]);
    setFlashMessage('Cart cleared');
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    setFlashMessage('Product added');
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    setFlashMessage('Product deleted');
  };

  const deleteCartItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
    setFlashMessage('Item removed from cart');
  };

  const updateCartItem = (id, updatedProduct) => {
    setCart((prevCart) => prevCart.map(item => item.id === id ? updatedProduct : item));
    setFlashMessage('Cart item updated');
  };

  const closeFlashMessage = () => {
    setFlashMessage('');
  };

  return (
    <CartContext.Provider value={{ cart, products, addToCart, clearCart, addProduct, deleteProduct, deleteCartItem, updateCartItem, flashMessage, closeFlashMessage }}>
      {children}
    </CartContext.Provider>
  );
};
