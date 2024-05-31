import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, deleteCartItem, updateCartItem } = useContext(CartContext);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setUpdatedPrice(item.price);
    setUpdatedQuantity(item.quantity);
  };

  const handleUpdate = (id) => {
    updateCartItem(id, { ...editingItem, price: parseFloat(updatedPrice), quantity: parseInt(updatedQuantity) });
    setEditingItem(null);
    setUpdatedPrice('');
    setUpdatedQuantity('');
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
            {editingItem && editingItem.id === item.id ? (
              <>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                />
                <input
                  type="number"
                  min="1"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                />
                <button onClick={() => handleUpdate(item.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">Update</button>
              </>
            ) : (
              <>
                <span className="text-gray-700">{item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}</span>
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2">Edit</button>
              </>
            )}
            <button onClick={() => deleteCartItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout" className="text-blue-500 mt-4 inline-block">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
