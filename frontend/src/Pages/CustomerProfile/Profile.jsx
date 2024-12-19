import React, { useState, useContext } from 'react';
import './Profile.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const loggedData = useContext(UserContext);

  // Function to fetch orders
  function fetchOrders(event) {
    event.preventDefault();
    fetch(`http://localhost:3026/api/v1/orders/order/${loggedData.loggedUser.loggedInUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data)
          setOrders(data);
          setShowOrders(true);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">Account Details</h1>
          <div className="profile-content">
            {/* User details */}
            <div className="profile-item">
              <span>Name:</span>
              <p>{loggedData.loggedUser.loggedInUser.name}</p>
            </div>
            <div className="profile-item">
              <span>Username:</span>
              <p>{loggedData.loggedUser.loggedInUser.username}</p>
            </div>
            <div className="profile-item">
              <span>Email:</span>
              <p>{loggedData.loggedUser.loggedInUser.email}</p>
            </div>
            <div className="profile-item">
              <span>Phone Number:</span>
              <p>{loggedData.loggedUser.loggedInUser.phoneNumber}</p>
            </div>
            <div className="profile-item">
              <span>Address:</span>
              <p>{loggedData.loggedUser.loggedInUser.address}</p>
            </div>
            <div className="profile-item">
              <span>Pincode:</span>
              <p>{loggedData.loggedUser.loggedInUser.pincode}</p>
            </div>
            <div className="profile-item">
              <span>Gender:</span>
              <p>{loggedData.loggedUser.loggedInUser.gender}</p>
            </div>
            <div className="profile-item">
              <span>Profile Created At:</span>
              <p>{loggedData.loggedUser.loggedInUser.createdAt}</p>
            </div>
            <div className="profile-item">
              <span>Last Updated At:</span>
              <p>{loggedData.loggedUser.loggedInUser.updatedAt}</p>
            </div>
          </div>

          {/* Show All Orders Button */}
          <button className="show-orders-btn" onClick={fetchOrders}>
            Show All Orders
          </button>

          {/* Orders Section */}
          {showOrders && (
            <div className="orders-section">
              <h2>Order History</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-item">
                      <p><strong>Order ID:</strong> {order._id}</p>
                      <p><strong>Date:</strong> {order.createdAt}</p>
                      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                      <p><strong>Items:</strong></p>
                      {order.products && order.products.length > 0 ? (
                        <ul>
                          {order.products.map((product) => (
                            <li key={product._id}>
                              <p><strong>Product Id:</strong>{product.productId._id}</p>
                              <p><strong>Mrp:</strong> ₹{product.productId.Mrp}</p>
                              <p><strong>Quantity:</strong> {product.quantity}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items found for this order.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
