import React from "react";
import './ProductCard.css';
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    // Truncate description to 4 words if it exceeds that length
    const truncatedDescription = props.details.description.split(' ').length > 4
        ? props.details.description.split(' ').slice(0, 4).join(' ') + '...'
        : props.details.description;

    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <img 
                        src={props.details.photo} 
                        className="card-img-top product-img" 
                        alt="Product Image"
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {truncatedDescription}
                        </h5>
                        <p className="card-text"><strong>Category:</strong> {props.details.category}</p>
                        <p className="card-text"><strong>MRP: ₹</strong>{props.details.Mrp}/Kg</p>
                        <p className="card-text"><strong>Seller:</strong> {props.details.seller_name}</p>
                    </div>
                    <div className="card-footer">
                        <Link to="/ProductView" state={{ details: props.details }}>
                            <p className="btn btn-success w-100">View Product</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}