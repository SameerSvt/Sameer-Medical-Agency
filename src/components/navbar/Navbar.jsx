import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Navbar.module.css'
import { FaSearch, FaCloudUploadAlt } from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate()
    const navItemsRight = ["AboutUs", "Cart", "Login", "Profile"]

    function handleHomeClick() {
        navigate('/')
    }

    function handleUploadPrescriptionClick() {
        navigate('/uploadprescription')
    }

  return (
    <div className={styles.navbar}>

        <div className={styles.logoNav} >
            <img src="src/assets/LogoNav.png" onClick={handleHomeClick}></img>
        </div>
        
        <div className={styles.search}>
            <input type="text" placeholder='Search your medicines'/>
            <FaSearch className={styles.iconSearch}/>
        </div>

        <div className={styles.uploadPresOuter}>
            <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                <FaCloudUploadAlt className={styles.iconUpload} size={"5rem"}/>
                <div> Upload Prescription </div>
        </div>
            

        </div>

        <div className={styles.navItems}>
            {navItemsRight.map((item, index) => {
                return <li key={index} > <Link className={styles.item} to={`/${item.toLowerCase() == "home" ? '/' : item.toLowerCase() }`}>{item}</Link></li>
            })}
        </div>
        
    </div>
  )
}
