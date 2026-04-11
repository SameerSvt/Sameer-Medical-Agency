import Home from './pages/home/Home.jsx'
import AboutUs from './pages/aboutUs/AboutUs.jsx'
import Cart from './pages/cart/Cart.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import Profile from './pages/profile/Profile.jsx'
import UploadPrescription from './pages/uploadPrescription/UploadPrescription.jsx'    

import Navbar from './components/navbar/Navbar.jsx'


import './App.css'

import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>

     <img className="bannerTop" src='src/assets/BannerTop.png' ></img>

     <Navbar/>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login />}/> 
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/uploadprescription" element={<UploadPrescription/>}/>
      </Routes>

      <div>
          <img src="src/assets/Footer.png" className="footerImg"></img>
      </div>
      
    </>
    
  
  )
}

export default App
