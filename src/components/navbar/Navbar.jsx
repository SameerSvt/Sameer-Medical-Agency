import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { FaSearch, FaCloudUploadAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

export default function Navbar({ searchTerm, setSearchTerm, setCategoryTerm }) {
    const navItemsRight = ["AboutUs", "Cart", "Login", "Profile"]

    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }
    function handleHomeClick() {
        navigate('/')
        setSearchTerm('')
        setCategoryTerm('All')
    }

    function handleUploadPrescriptionClick() {
        closeMenu()
        navigate('/uploadprescription')
    }

    function hadnleSearchIconClick() {
        setCategoryTerm('All')
        if (searchTerm.length > 0) {
            navigate('/catalog')
        }
    }

    function handleOnSearchChange(e) {
        setCategoryTerm('All')
        const value = e.target.value
        setSearchTerm(value)
    }

    return (
        <div className={styles.navbar}>


            <img src="src/assets/LogoNav.png" className={styles.logoNav} onClick={handleHomeClick}></img>
            <img src="Logo.png" className={styles.logoPhone} onClick={handleHomeClick}></img>

            <div className={styles.search}>
                <input type="text" placeholder='Search your medicines' value={searchTerm} onChange={handleOnSearchChange} />
                <FaSearch className={styles.iconSearch} onClick={hadnleSearchIconClick} />
            </div>

            <div> {!isMenuOpen ? <IoMenu className={styles.menu} onClick={handleMenuClick} /> : <IoClose className={styles.menu} onClick={handleMenuClick} />}</div>

            <div className={styles.navItems}>
                <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                    <FaCloudUploadAlt className={styles.iconUpload} />
                    <div> Upload Prescription </div>
                </div>

                {navItemsRight.map((item, index) => {
                    return <li className={styles.listing} key={index} > <Link className={styles.item} to={`/${item?.toLowerCase() == "home" ? '/' : item?.toLowerCase()}`}>{item}</Link></li>
                })}
            </div>

            {isMenuOpen &&
                <div className={styles.menuItems}>
                    <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                        <FaCloudUploadAlt className={styles.iconUpload} />
                        <div> Upload Prescription </div>
                    </div>

                    {navItemsRight.map((item, index) => {
                        return <li className={styles.listing} key={index} onClick={closeMenu} > <Link className={styles.item} to={`/${item?.toLowerCase() == "home" ? '/' : item?.toLowerCase()}`}>{item}</Link><hr></hr></li>
                    })}
                </div>}

        </div>
    )
}
