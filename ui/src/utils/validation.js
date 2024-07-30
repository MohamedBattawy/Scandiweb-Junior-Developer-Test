// src/utils/validation.js

// Function to check if a value is a valid number
export const isNumber = (value) => !isNaN(value) && isFinite(value);

// Function to validate the product
export const validateProduct = (productType, sku, name, price, size, weight, height, width, length) => {
  console.log("sku:",sku);
  console.log("price:",price);
  console.log("name:",name);
  console.log("type:",productType);
  if (!sku || !name || !price || !productType) {
    console.log("entered the first if");
    return 'Please, submit all required data.';
  }

  if (!isNumber(price)) {
    console.log("Entered price problem");
    return 'Price must be a valid number.';
  }

  if (productType === 'Book') {
    if (weight === null || weight === '') {
      return 'Weight is required for Book.';
    } else if (!isNumber(weight)) {
      return 'Weight must be a valid number.';
    }
  }

  if (productType === 'DVD') {
    if (size === null || size === '') {
      return 'Size is required for DVD.';
    } else if (!isNumber(size)) {
      return 'Size must be a valid number.';
    }
  }

  if (productType === 'Furniture') {
    if (!height || !width || !length) {
      return 'Height, width, and length are required for Furniture.';
    } else if (!isNumber(height) || !isNumber(width) || !isNumber(length)) {
      return 'Height, width, and length must be valid numbers.';
    }
  }

  return ''; // No errors
};
