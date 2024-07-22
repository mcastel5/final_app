// src/MyProducts.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProducts.css';

function MyProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image: 'placeholder.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20, image: 'placeholder.jpg' },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedDescription(product.description);
    setEditedPrice(product.price);
  };

  const handleUpdate = () => {
    setProducts(products.map(product => product.id === editingProduct.id ? { ...product, name: editedName, description: editedDescription, price: parseFloat(editedPrice) } : product));
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <div className="my-products">
      <div className="my-products-header">
        <h2>My Products</h2>
        <button className="add-product-button" onClick={handleAddProduct}>New Product</button>
      </div>
      {products.map(product => (
        <div key={product.id} className="my-product-card">
          {editingProduct && editingProduct.id === product.id ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Product Name"
                required
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Product Description"
                required
              />
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                placeholder="Product Price"
                required
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingProduct(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
              {product.image && <img src={product.image} alt="Product"/>}
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
