// src/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = { id, name: 'Product ' + id, description: 'Description ' + id, price: 10 * id, image: 'placeholder.jpg' };

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
    </div>
  );
}

export default ProductDetail;
