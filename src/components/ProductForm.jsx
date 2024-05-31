import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toBase64 } from '../utils/utils';

const ProductForm = () => {
  const { addProduct } = useContext(CartContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && price && image) {
      const base64Image = await toBase64(image);
      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        image: base64Image,
      };
      addProduct(newProduct);
      setName('');
      setPrice('');
      setImage(null);
      document.getElementById('imageInput').value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
        <input type="file" id="imageInput" onChange={handleImageChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">Add Product</button>
    </form>
  );
};

export default ProductForm;
