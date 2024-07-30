import React, { useState } from 'react';
import './Card.css';

export default function Card({ product, onCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(product.sku, !isChecked);
  };

  return (
    <div className="card">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
        className="delete-checkbox"
      />
      <h3>{product.name}</h3>
      <p>SKU: {product.sku}</p>
      <p>Price: ${product.price}</p>
      {product.type === 'Book' && <p>Weight: {product.weight} Kg</p>}
      {product.type === 'DVD' && <p>Size: {product.size} MB</p>}
      {product.type === 'Furniture' && (
        <p>Dimensions: {product.height}x{product.width}x{product.length}</p>
      )}
    </div>
  );
}
