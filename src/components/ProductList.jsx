import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';

const ProductList = () => {
  const { products, addToCart, deleteProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (productId, qty) => {
    setQuantity({ ...quantity, [productId]: qty });
  };

  const handleAddToCart = (product) => {
    const qty = quantity[product.id] || 1;
    addToCart({ ...product, quantity: parseInt(qty) });
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <ProductForm />
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div key={product.id} className="product-card relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                <input type="number" min="1" value={quantity[product.id] || 1} onChange={(e) => handleQuantityChange(product.id, e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
              </div>
              <button onClick={() => handleAddToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2">Add to Cart</button>
              <button onClick={() => deleteProduct(product.id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">x</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" className="text-blue-500 mt-4 inline-block">Go to Cart</Link>
    </div>
  );
};

export default ProductList;
