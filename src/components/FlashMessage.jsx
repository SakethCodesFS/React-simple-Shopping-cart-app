import React from 'react';

const FlashMessage = ({ message, onClose }) => {
  return (
    message && (
      <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flash-message">
        {message}
        <button onClick={onClose} className="ml-4 text-white font-bold">x</button>
      </div>
    )
  );
};

export default FlashMessage;
