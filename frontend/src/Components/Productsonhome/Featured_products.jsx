import React from 'react'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'
import './Featured_products.css'
import Csa from '../Header/Csa';
const Featured_products = () => {
  return (
    <>
    <div className='featuredproducts'>
      <h1>Featured Products</h1>
      <div className="cards">
            <div className="card1">
              <img src={assets.wheat} alt="" />
                <h3><Link to="/categories" state={{ categories: 'Grains' }}>Grains</Link></h3>
            </div>
            <div className="card2">
              <img src={assets.rice} alt="" />
                <h3><Link to="/categories" state={{ categories: 'Pulses' }}>Pulses</Link></h3>
            </div>
            <div className="card3">
              <img src={assets.dairy} alt="" />
                <h3><Link to="/categories" state={{ categories: 'Spices' }}>Spices</Link></h3>
            </div>
            <div className="card4">
              <img src={assets.fruits} alt="" />
                <h3><Link to="/categories" state={{ categories: 'Fruits' }}>Fruits</Link></h3>
            </div>
            <div className="card5">
              <img src={assets.vegetables} alt="" />
                <h3><Link to="/categories" state={{ categories: 'Vegetables' }}>Vegetables</Link></h3>
            </div>
      </div>
    </div>
    <Csa/>
    </>
  )
}

export default Featured_products
