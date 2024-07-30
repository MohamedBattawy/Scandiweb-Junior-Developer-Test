import React, { useState } from 'react';
import Header from '../components/Header';
import './AddPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateProduct } from '../utils/validation'; // Adjust the path as necessary

export default function AddPage() {
  const navigate = useNavigate();

  const [productType, setProductType] = useState('');
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const validationError = validateProduct(productType, sku, name, price, size, weight, height, width, length);

    if (validationError) {
      setError(validationError);
      return;
    }

    // Create the product object
    const product = {
      sku,
      name,
      price,
      type: productType,
      ...(productType === 'DVD' && { size }),
      ...(productType === 'Book' && { weight }),
      ...(productType === 'Furniture' && { height, width, length }),
    };

    // Log the product data before sending it
    console.log("Product data before sending:", product);

    // Post the product data to the backend
    axios.post('http://scandijun.mypressonline.com/products', product)
      .then(response => {
        if (response.data.status === 'error') {
          setError(response.data.message); // Show backend error message
        } else {
          console.log("Product saved successfully:", response.data);
          navigate('/');
        }
      })
      .catch(() => {
        setError('An error occurred while saving the product.');
      });
  };

  const handleProductTypeChange = (e) => {
    const newType = e.target.value;
    setProductType(newType);

    // Reset special properties based on the new product type
    if (newType === 'DVD') {
      setWeight(null);
      setHeight(null);
      setWidth(null);
      setLength(null);
    } else if (newType === 'Book') {
      setSize(null);
      setHeight(null);
      setWidth(null);
      setLength(null);
    } else if (newType === 'Furniture') {
      setSize(null);
      setWeight(null);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const rightContent = (
    <>
      <button className="btn btn-success" onClick={handleSubmit}>Save</button>
      <Link to="/">
        <button className="btn btn-secondary">Cancel</button>
      </Link>
    </>
  );

  return (
    <div>
      <Header title="Product Add" rightContent={rightContent} />
      <div className="container">
        <form id="product_form">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input type="text" id="sku" className="form-control" value={sku} onChange={handleInputChange(setSku)} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={handleInputChange(setName)} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" className="form-control" value={price} onChange={handleInputChange(setPrice)} required />
          </div>
          <div className="form-group">
            <label htmlFor="productType">Product Type</label>
            <select
              id="productType"
              className="form-control"
              value={productType}
              onChange={handleProductTypeChange}
              required
            >
              <option value="">Select Type</option>
              <option value="DVD">DVD</option>
              <option value="Book">Book</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          {productType === 'DVD' && (
            <div className="form-group">
              <label htmlFor="size">Size (MB)</label>
              <input type="number" id="size" className="form-control" value={size || ''} onChange={handleInputChange(setSize)} required />
              <small>Please, provide size in MB</small>
            </div>
          )}

          {productType === 'Book' && (
            <div className="form-group">
              <label htmlFor="weight">Weight (Kg)</label>
              <input type="number" id="weight" className="form-control" value={weight || ''} onChange={handleInputChange(setWeight)} required />
              <small>Please, provide weight in Kg</small>
            </div>
          )}

          {productType === 'Furniture' && (
            <>
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input type="number" id="height" className="form-control" value={height || ''} onChange={handleInputChange(setHeight)} required />
              </div>
              <div className="form-group">
                <label htmlFor="width">Width (cm)</label>
                <input type="number" id="width" className="form-control" value={width || ''} onChange={handleInputChange(setWidth)} required />
              </div>
              <div className="form-group">
                <label htmlFor="length">Length (cm)</label>
                <input type="number" id="length" className="form-control" value={length || ''} onChange={handleInputChange(setLength)} required />
              </div>
              <small>Please, provide dimensions in cm</small>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
