import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Home from "./pages/home/Home.jsx";
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UploadPrescription from "./pages/uploadPrescription/UploadPrescription.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Catalog from "./components/products/Catalog.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("All");
  return (
    <>
      <div>
        <img className="bannerTop" src="src/assets/BannerTop.png"></img>

        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCategoryTerm={setCategoryTerm}
        />

        <Routes>
          <Route path="/" element={<Home setCategoryTerm={setCategoryTerm} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/catalog"
            element={
              <Catalog searchTerm={searchTerm} categoryTerm={categoryTerm} />
            }
          />
          <Route path="/uploadprescription" element={<UploadPrescription />} />
        </Routes>
      </div>

      <div className="footer">
        <img src="src/assets/Footer.png" className="footerImg"></img>
      </div>
    </>
  );
}

export default App;
