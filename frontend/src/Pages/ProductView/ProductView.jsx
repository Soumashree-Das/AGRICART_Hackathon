import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductView.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';

export default function ProductView() {
    const location = useLocation();
    const details = location.state?.details;
    const loggedData = useContext(UserContext);

    // State for quantity with an initial value of 1
    const [quantity, setQuantity] = useState(1);

    // State for the cart
    const [cart, setCart] = useState({
        userId: loggedData?.loggedUser?.loggedInUser?._id || '', 
        productId: details?._id || '',
        quantity: 1,
    });

    // Function to handle quantity changes
    const updateQuantity = (newQuantity) => {
        // Ensure quantity doesn't go below 1
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
        // Update the cart state with the new quantity
        setCart((prevCart) => ({ ...prevCart, quantity: newQuantity }));
    };

    const AddtoCart = (event) => {
        event.preventDefault();
        console.log(loggedData);
        if (!cart.userId || !cart.productId) {
            console.log("User or product ID missing");
            return;
        }
        fetch("http://localhost:3026/api/v1/cart/add", {
            method: "POST",
            body: JSON.stringify(cart),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log(details);
    }, [details]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="row d-flex align-items-center">
                    {/* Product Image on the Left with Centering */}
                    <div className="col-md-5 order-md-1 order-1 mb-4 mb-md-0 product-image-container">
                        <img
                            src={details.photo}
                            alt={details.description}
                            className="img-fluid product-image"
                        />
                    </div>

                    {/* Product Details on the Right */}
                    <div className="col-md-7 order-md-2 order-2">
                        <h2 className="product-name mb-3">{details.description}</h2>
                        <p className="product-detail"><strong>MRP:</strong> ₹{details.Mrp}/Kg</p>
                        <p className="product-detail"><strong>Units:</strong> {details.units}Kg</p>
                        <p className="product-detail"><strong>Date of Produce:</strong> {details.date_of_produce}</p>
                        <p className="product-detail"><strong>Growing Practices:</strong> {details.growing_practices}</p>
                        <p className="product-detail"><strong>Place of Origin:</strong> {details.place_of_origin}</p>
                        <p className="product-detail"><strong>Product ID:</strong> {details.product_id}</p>
                        <p className="product-detail"><strong>Seller Name:</strong> {details.seller_name}</p>
                        <p className="product-detail"><strong>Category:</strong> {details.category}</p>

                        {/* Quantity Selection Buttons */}
                        <div className="quantity-container my-3">
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => updateQuantity(quantity - 1)}
                            >
                                -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => updateQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="btn btn-primary mt-4 add-to-cart-button" onClick={AddtoCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
