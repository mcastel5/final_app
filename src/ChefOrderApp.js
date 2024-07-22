// src/ChefOrderApp.js
import React, { useState } from 'react';
import './ChefOrderApp.css';

const ordersMock = [
  { orderId: '00001', customer: 'Domer 1', items: 'Pizza' },
  { orderId: '00002', customer: 'Domer 2', items: 'Salad' },
  { orderId: '00003', customer: 'Domer 3', items: 'Burger, Pizza' },
];

function ChefOrderApp() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const selectOrder = (order) => {
    setSelectedOrder(order);
  };

  const addToCurrentlyPreparing = (order) => {
    const preparingList = document.querySelector('.preparing-list');
    const preparingItem = document.createElement('div');
    preparingItem.className = 'preparing-item';
    preparingItem.dataset.orderId = order.orderId;
    preparingItem.textContent = `#${order.orderId} | ${order.customer} | ${order.items}`;
    preparingList.appendChild(preparingItem);
  };

  const deleteFromCurrentlyPreparing = (order) => {
    const preparingList = document.querySelector('.preparing-list');
    const preparingItem = preparingList.querySelector(`.preparing-item[data-order-id='${order.orderId}']`);
    if (preparingItem) {
      preparingList.removeChild(preparingItem);
    }
  };

  return (
    <div className="order-list-container">
      <h2>Orders</h2>
      <div className="order-list">
        {ordersMock.map((order) => (
          <div key={order.orderId} className="order-item" onClick={() => selectOrder(order)}>
            #{order.orderId} | {order.customer} | {order.items}
          </div>
        ))}
      </div>
      <div className="order-details" style={{ display: selectedOrder ? 'block' : 'none' }}>
        {selectedOrder && (
          <>
            <h3>Order Details</h3>
            <p>Order ID: {selectedOrder.orderId}</p>
            <p>Customer: {selectedOrder.customer}</p>
            <p>Items: {selectedOrder.items}</p>
            <input type="text" placeholder="Add Expected Time of Arrival: " />
            <button onClick={() => deleteFromCurrentlyPreparing(selectedOrder)}>Mark as Ready</button>
            <button onClick={() => addToCurrentlyPreparing(selectedOrder)}>Add to Currently Preparing</button>
          </>
        )}
      </div>
      <div className="preparing-container">
        <h2>Currently Preparing</h2>
        <div className="preparing-list"></div>
      </div>
    </div>
  );
}

export default ChefOrderApp;
