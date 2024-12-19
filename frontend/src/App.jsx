import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/AboutUs/About';
import Awarness from './Pages/Awarness/Awarness';
import Contact from './Pages/contactus/Contact';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Categories from './Pages/Categories/Categories';
import ProductView from './Pages/ProductView/ProductView';
import Private from './Components/Private/Private';
import { UserContext } from './contexts/UserContext';
import Cart from './Pages/Cart/Cart';
import Profile from './Pages/CustomerProfile/Profile';
import LoginFarmer from './Pages/Login/LoginFarmer';
import RegisterAsFarmer from './Pages/Register/RegisterAsFarmer';
import Cust from './Components/Private/Cust';
import Farmer from './Components/Private/Farmer';
import Entry from './Components/Private/entry';
import FarmerProfile from './Pages/FarmerProfile/FarmerProfile';
function App() {
  const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/awareness' element={<Awarness/>}/>
          <Route path='/contact-us' element={<Private component={Contact}/>} />
          <Route path='/Login' element={<Entry component={Login}/>} />
          <Route path='/Register' element={<Entry component={Register}/>} />
          <Route path='/login-farmer' element={<Entry component={LoginFarmer}/>} />
          <Route path='/register-farmer' element={<Entry component={RegisterAsFarmer}/>} />
          <Route path='/categories' element={<Private component={Categories}/>}/>
          <Route path='/ProductView' element={<Private component={ProductView}/>}/>
          <Route path='/cart' element={<Cust component={Cart}/>}/>
          <Route path='/profile' element={<Cust component={Profile}/>}/>
          <Route path='/profile-farmer' element={<Farmer component={FarmerProfile}/>}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
