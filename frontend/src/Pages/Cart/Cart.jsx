import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { UserContext } from "../../contexts/UserContext";
import "./Cart.css"; // You can keep custom styles here if needed

export default function Cart() {
  const loggedData = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [orderSuccess, setOrderSuccess] = useState(false); // State to control order success message
  const [order, setOrder] = useState({
    userId: loggedData.loggedUser.loggedInUser._id,
    products: cart,
    address: loggedData.loggedUser.loggedInUser.address,
    pincode: loggedData.loggedUser.loggedInUser.pincode,
  });

  useEffect(() => {
    console.log(loggedData);
    const fetchCartItems = async () => {
      if (
        loggedData &&
        loggedData.loggedUser.loggedInUser &&
        loggedData.loggedUser.loggedInUser._id
      ) {
        try {
          const response = await fetch(
            `http://localhost:3026/api/v1/cart/${loggedData.loggedUser.loggedInUser._id}`
          );
          const data = await response.json();

          console.log("API Response Data:", data);

          if (response.ok && Array.isArray(data.products)) {
            setOrder((prevDetails) => {
              return { ...prevDetails, products: data.products };
            });
            setCart(data.products);
          } else {
            console.error(
              "Failed to fetch cart items:",
              data.message || "No message provided"
            );
            setCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("User is not logged in or data is not available.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [loggedData.loggedUser]);

  const handleRemoveFromCart = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:3026/api/v1/cart/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedData.loggedUser.loggedInUser._id,
          productId,
          quantity: quantity || 1,
        }),
      });

      if (response.ok) {
        setCart(cart.filter((item) => item.productId._id !== productId));
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to remove item from cart:",
          errorData.message || "No message provided"
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleProceedToPayment = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.Mrp * item.quantity,
    0
  );

  function pay(event) {
    event.preventDefault();
    fetch("http://localhost:3026/api/v1/orders/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setOrderSuccess(true); // Show success message
          setShowModal(false); // Close the modal
          setTimeout(() => {
            setOrderSuccess(false);
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Your Cart</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            Your cart is empty.
          </div>
        ) : (
          <>
            {orderSuccess && (
              <div className="alert alert-success" role="alert">
                Order created successfully!
              </div>
            )}
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.productId._id}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.productId.photo || "/path/to/default/image.jpg"}
                      alt={item.productId.description || "Product Image"}
                      className="img-thumbnail"
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <span>{item.productId.description || "No description"}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      min="1"
                      style={{ width: "70px", marginRight: "10px" }}
                    />
                    <span>₹{item.productId.Mrp * item.quantity}</span>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() =>
                        handleRemoveFromCart(item.productId._id, item.quantity)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <h4>Total Price: ₹{subtotal}</h4>
              <button
                className="btn btn-success"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Confirm Payment</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="fs-5">
                Are you sure you want to proceed to payment?
              </p>
              <p className="fw-bold fs-4">Total: ₹{subtotal}</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={pay}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
