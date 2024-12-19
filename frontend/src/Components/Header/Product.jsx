import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Product = (props) => {
  return (
    <div className="card">
      
    <img className="product--image" src={props.url} alt="product image" />
    <div className="product_content">
    <h2 className='heading'>{props.name}</h2>
    
    <p className="price">{props.price}</p>
    
      <Link to="/categories" state={{ categories: 'Fruits' }}><button className='carousel-btn'>{props.description}</button></Link>
    
    </div>
  </div>
  )
}

export default Product
