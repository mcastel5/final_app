// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <h1>DineLink</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/my-products">My Products</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
