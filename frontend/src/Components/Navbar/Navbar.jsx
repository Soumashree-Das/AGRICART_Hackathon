import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Navbar = (props) => {
  const [menu, setMenu] = useState(props.page);
  const loggedData = useContext(UserContext);
  const navigate = useNavigate(); // Use navigate to programmatically redirect
  const categories = [
    { name: 'Fruits', path: '/categories', listName: 'Fruits' },
    { name: 'Vegetables', path: '/categories', listName: 'Vegetables' },
    { name: 'Spices', path: '/categories', listName: 'Spices' },
    { name: 'Grains', path: '/categories', listName: 'Grains' },
    { name: 'Pulses', path: '/categories', listName: 'Pulses' },
  ];

  function logout() {
    localStorage.removeItem("user");
    loggedData.setLoggedUser(null);
  }

  function handleAccountRedirect() {
    if (loggedData.loggedUser?.loggedInUser) {
      navigate("/profile"); // Redirect to customer profile
    } else if (loggedData.loggedUser?.loggedInFarmer) {
      navigate("/profile-farmer"); // Redirect to farmer profile (if applicable)
    } else {
      navigate("/login"); // Default redirect to login
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} id="logo" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'home' ? 'active' : ''}`}
                to="/"
                onClick={() => setMenu('home')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${menu === 'categories' ? 'active' : ''}`}
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      to={category.path}
                      state={{ categories: category.listName }}
                      onClick={() => setMenu('categories')}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'awareness' ? 'active' : ''}`}
                to="/awareness"
                onClick={() => setMenu('awareness')}
              >
                Awareness
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'contact-us' ? 'active' : ''}`}
                to="/contact-us"
                onClick={() => setMenu('contact-us')}
              >
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${menu === 'about-us' ? 'active' : ''}`}
                to="/about-us"
                onClick={() => setMenu('about-us')}
              >
                About us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center navbar-right">
            <div className="navbar-searchicon position-relative ms-3">
              <Link to="/cart"><img src={assets.bag_icon} alt="Bag Icon" /></Link>
              <div className="dot"></div>
            </div>
            {loggedData.loggedUser !== null ? (
              <div className="dropdown ms-3">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  type="button"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </button>
                <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                  <li>
                    <button className="dropdown-item" onClick={handleAccountRedirect}>
                      My Account
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        console.log('Logged out');
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown ms-3">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  type="button"
                  id="signinDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign in
                </button>
                <ul className="dropdown-menu" aria-labelledby="signinDropdown">
                  <li>
                    <Link className="dropdown-item" to="/login-farmer">
                      Sign in as Farmer
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Sign in as Customer
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
