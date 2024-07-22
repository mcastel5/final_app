// src/Checkout.js
import React from 'react';
import './Checkout.css';

function Checkout() {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 2 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = () => {
    alert('Order submitted successfully!');
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h2>Checkout</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-price">${item.price.toFixed(2)}</span>
                    <span className="checkout-item-quantity">Quantity: {item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="price">Total: ${total.toFixed(2)}</div>
            <div className="button-container">
              <button onClick={handleSubmitOrder}>Submit Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
