import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Modal from 'react-modal';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCompletePurchase = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearCart();
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index} className="flex items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
            <span className="text-gray-700">{item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-4">Total: ${total}</h2>
      <button onClick={handleCompletePurchase} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Complete Purchase</button>
      
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Purchase Details</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4 inline-block" />
                <span className="text-gray-700">{item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">Total: ${total}</h2>
          <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
