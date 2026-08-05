import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { FaSearch, FaCloudUploadAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaUserNurse, FaCartPlus } from "react-icons/fa6";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx';
import { useProductFilter } from '../../context/ProductFilterContext.jsx';


export default function Navbar() {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useAuth()
    const { billingDetails } = useCart()
    const { setSearchTerm, setSelectedFilters, clearFilter } = useProductFilter()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchBox, setSearchBox] = useState("")

    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    function handleHomeClick() {
        navigate('/')
        setSearchBox('')
        setSearchTerm('')
        setSelectedFilters(clearFilter)
    }

    function handleUploadPrescriptionClick() {
        navigate('/uploadprescription')
    }

    function handleSearchIconClick() {
        setSelectedFilters(clearFilter)
        setSearchTerm(searchBox)
        if (searchBox.trim().length === 0) {
            alert("Search for product first")
        } else {
            navigate('/catalog')
        }
    }

    function handleOnSearchChange(e) {
        setSearchBox(e.target.value)
    }

    //Enter key invoked for searching
    const handleEnterKeyClick = (e) => {
        if (e.key === "Enter") {
            handleSearchIconClick()
        }
    }

    const firstName = user?.fullName?.split(" ")[0]
    return (
        <div className={styles.navbar}>

            {/* for desktop */}
            <img src="myAssets/LogoNav.png" className={styles.logoNav} onClick={handleHomeClick}></img>

            {/* for phone */}
            <img src="Logo.png" className={styles.logoPhone} onClick={handleHomeClick}></img>


            <div className={styles.search}>
                <input type="text" placeholder='Search your medicines' value={searchBox} onChange={handleOnSearchChange} onKeyDown={handleEnterKeyClick} />
                <FaSearch className={styles.iconSearch} onClick={handleSearchIconClick} />
            </div>

            <div> <IoMenu className={styles.menu} onClick={handleMenuClick} /></div>

            {/* for desktop */}
            <div className={styles.navItems}>
                {isLoggedIn && <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                    <FaCloudUploadAlt className={styles.iconUpload} />
                    <div> Upload Prescription </div>
                </div>
                }
                <Link className={styles.item} to="/about-us">About Us</Link>

                {!isLoggedIn && <Link className={styles.item} to="/login">Login / Sign Up</Link>}

                {isLoggedIn &&
                    <Link className={styles.iconOption} to="/cart">
                        <div>
                            <FaCartPlus className={styles.iconCart} />
                        </div>
                        <div className={styles.cartCount}>
                            <span>{billingDetails.quantity || 0}</span>
                            <h1>Cart</h1>
                        </div>
                    </Link>}

                {isLoggedIn && <div>
                    <Link className={styles.iconOption} to="/profile">
                        <div>
                            <FaUserNurse className={styles.iconProfile} />
                        </div>
                        <div>
                            <p>Hi ! {firstName}</p>
                            <h1>Profile</h1>
                        </div>

                    </Link></div>}
            </div>

            <div className={`${styles.overlay} ${isMenuOpen ? styles.isOverlayActive : ''}`} onClick={closeMenu}>

                <div className={`${styles.menuWrapper} ${isMenuOpen ? styles.isMenuWrapperActive : ''}`}>

                    <div className={styles.closeMenu}> <IoClose color="gray" size="25px" onClick={handleMenuClick} /> </div>

                    <div className={styles.menuItems}>
                        {isLoggedIn &&
                            <div>
                                <div>
                                    <Link className={styles.iconOption} to="/profile">
                                        <div>
                                            <FaUserNurse className={styles.iconProfile} />
                                        </div>
                                        <div>
                                            <p>Hi ! {firstName}</p>
                                            <h1>Profile</h1>
                                        </div>

                                    </Link></div>
                                <hr></hr>
                            </div>
                        }

                        {isLoggedIn &&
                            <div>
                                <Link className={styles.iconOption} to="/cart">
                                    <div>
                                        <FaCartPlus className={styles.iconCart} />
                                    </div>
                                    <div className={styles.cartCount}>
                                        <span>{billingDetails.quantity || 0}</span>
                                        <h1>Cart</h1>
                                    </div>
                                </Link>
                                <hr></hr>
                            </div>
                        }

                        <Link className={styles.item} to="/about-us">About Us</Link>
                        <hr></hr>

                        {isLoggedIn && <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                            <FaCloudUploadAlt className={styles.iconUpload} />
                            <div> Upload Prescription </div>
                        </div>
                        }

                        {!isLoggedIn && <Link className={styles.item} to="/login">Login / Sign Up</Link>}
                    </div>

                </div>
            </div>

        </div>
    )
}

