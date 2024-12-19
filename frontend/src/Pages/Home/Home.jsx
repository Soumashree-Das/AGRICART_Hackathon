import React from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Featured_products from '../../Components/Productsonhome/Featured_products'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <>
      <Navbar page={"home"}/>
      <Header/>
      <Featured_products/>
      <Footer/>
    </>
  )
}

export default Home
