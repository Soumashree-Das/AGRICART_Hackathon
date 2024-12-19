import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="container">
        <div className="row footercontent">
          <div className="col-lg-6 col-md-12 footerleft mb-4 mb-lg-0">
            <img src={assets.logo} id="logo" alt="Logo" />
            <p>
              Argricart is dedicated to bridging the gap between farmers and
              consumers by delivering fresh, naturally produced vegetables and
              daily use food items straight from the farm to your doorstep. We
              believe in supporting local farmers and promoting sustainable
              agricultural practices.
            </p>
            <div className="socialmediaicon">
              <img src={assets.facebook} alt="Facebook" className="me-3" />
              <img src={assets.linkedin_icon} alt="LinkedIn" className="me-3" />
              <img src={assets.twitter} alt="Twitter" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 footercenter mb-4 mb-md-0">
            <h2>COMPANY</h2>
            <ul className="list-unstyled">
              <Link to="/"><li>Home</li></Link>
              <Link to="/contact-us"><li>Contact Us</li></Link>
              <Link to="/about-us"><li>About Us</li></Link>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footerright">
            <h2>GET IN TOUCH</h2>
            <ul className="list-unstyled">
              <li>910004598</li>
              <li>agricart890@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="footercopyright text-center">
        Copyright 2024 Agricart.com. All rights Reserved
      </p>
    </div>
  );
};

export default Footer;
