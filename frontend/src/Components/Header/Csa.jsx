import React from 'react'
import './Csa.css'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
const Csa = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/csa'); // Adjust the route as per your routing configuration
    };
  return (
    <div className="csa-container">
      <img
        src={assets.farmer}
        alt="Farmer"
        className="csa-image"
      />
      <div className="csa-info">
        <h2>Community Supported Agriculture (CSA)</h2>
        <p>
          The CSA model connects consumers directly with farmers, allowing them to purchase shares of the farm's harvest in advance. This provides farmers with a stable income and ensures consumers receive fresh, locally-grown produce.
        </p>
        <button className="csa-button" onClick={handleNavigate}>
          Learn More About CSA
        </button>
      </div>
    </div>
  );

}

export default Csa

