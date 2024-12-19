import React, { useContext } from 'react';
import './FarmerProfile.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function FarmerProfile() {
  const loggedData = useContext(UserContext);

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">Farmer Account Details</h1>
          <div className="profile-content">
            {/* Farmer details */}
            <div className="profile-item">
              <span>Name:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.name}</p>
            </div>
            <div className="profile-item">
              <span>Username:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.username}</p>
            </div>
            <div className="profile-item">
              <span>Email:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.email}</p>
            </div>
            <div className="profile-item">
              <span>Phone Number:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.phoneNumber}</p>
            </div>
            <div className="profile-item">
              <span>Address:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.address}</p>
            </div>
            <div className="profile-item">
              <span>Pincode:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.pincode}</p>
            </div>
            <div className="profile-item">
              <span>State:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.state}</p>
            </div>
            <div className="profile-item">
              <span>Farming Certifications:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.farmingCertifications}</p>
            </div>
            <div className="profile-item">
              <span>Farming Details:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.farmingDetails}</p>
            </div>
            <div className="profile-item">
              <span>Gender:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.gender}</p>
            </div>
            <div className="profile-item">
              <span>Profile Created At:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.createdAt}</p>
            </div>
            <div className="profile-item">
              <span>Last Updated At:</span>
              <p>{loggedData.loggedUser.loggedInFarmer.updatedAt}</p>
            </div>
          </div>

          {/* Management Page Button */}
          <Link to="/management">
            <button className="management-btn">Go to Management Page</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
