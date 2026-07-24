import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/home/Home.jsx";
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UploadPrescription from "./pages/uploadPrescription/UploadPrescription.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Catalog from "./components/products/Catalog.jsx";
import Checkout from "./pages/checkout/Checkout.jsx"
import Address from "./pages/profile/address/Address.jsx";
import OrdersHistory from "./pages/profile/ordersHistory/OrdersHistory.jsx";
import EditProfile from "./pages/profile/editProfile/EditProfile.jsx"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("All");
  const {isWholesaleApplied} = useAuth()
  return (
    <>
      <div>
        <img className="bannerTop" src="myAssets/BannerTop.png"></img>

        <Navbar />

        <div className={`B2BMode ${isWholesaleApplied ? 'active' : ""}`}>
          <img src="/myAssets/B2BMode.png"></img>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/uploadprescription" element={<UploadPrescription />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/address" element={<Address />} />
          <Route path="/ordersHistory" element={<OrdersHistory />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>

      <div className="footer">
        <img src="myAssets/Footer.png" className="footerImg"></img>
      </div>
    </>
  );
}

export default App;
