import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  useEffect(() => {
    axios.get('http://scandijun.mypressonline.com/')
    // axios.get('http://localhost/scandiapi/')
      .then(response => {
        setProducts(response.data);
        console.log("set products successfully with data:", response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleCheckboxChange = (sku, isChecked) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(sku);
        console.log("checked sku:",sku);
      } else {
        newSet.delete(sku);
      }
      return newSet;
    });
  };

  const handleMassDelete = () => {
    if (selectedProducts.size === 0) {
      alert('No products selected for deletion.');
      return;
    }
    axios.delete('http://scandijun.mypressonline.com/products', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { skus: Array.from(selectedProducts) }
    })
      .then(response => {
        alert('Selected products deleted successfully.');
        setProducts(products.filter(product => !selectedProducts.has(product.sku)));
        setSelectedProducts(new Set());
      })
      .catch(error => {
        console.error('Error deleting products:', error);
      });
  };

  const rightContent = (
    <div className="header-right">
      <Link to="/add">
        <button className="btn btn-primary">ADD</button>
      </Link>
      <button  id= "delete-product-btn" className="btn btn-danger" onClick={handleMassDelete}>MASS DELETE</button>
    </div>
  );

  return (
    <div className="container">
      <Header title="Product List" rightContent={rightContent} />
      <div className="product-grid">
        {products.length > 0 && products.map(product => (
          <Card 
            key={product.sku} 
            product={product} 
            onCheckboxChange={handleCheckboxChange} 
          />
        ))}
      </div>
    </div>
  );
}
