// src/Cart.js
import React from 'react';
import './Cart.css';

function Cart() {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 2 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  <span className="cart-item-quantity">Quantity: {item.quantity}</span>
                </div>
                <button>Remove</button>
              </li>
            ))}
          </ul>
          <div className="price">Total: ${total.toFixed(2)}</div>
          <div className="button-container">
            <button>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
