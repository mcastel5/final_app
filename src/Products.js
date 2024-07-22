// src/Products.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image: 'placeholder.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20, image: 'placeholder.jpg' },
  ];

  return (
    <div className="products-page">
      <h2>Available Products</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
