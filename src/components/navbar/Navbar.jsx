import {Link, useNavigate} from 'react-router-dom'
import styles from './Navbar.module.css'
import { FaSearch, FaCloudUploadAlt } from "react-icons/fa";

export default function Navbar({searchTerm, setSearchTerm, setCategoryTerm}) {
    const navItemsRight = ["AboutUs", "Cart", "Login", "Profile"]

    const navigate = useNavigate()

    function handleHomeClick() {
        navigate('/')
        setSearchTerm('')
        setCategoryTerm('All')
    }

    function handleUploadPrescriptionClick() {
        navigate('/uploadprescription')
    }

    function hadnleSearchIconClick() {
        setCategoryTerm('All')
        if(searchTerm.length > 0) {
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

        <div className={styles.logoNav} >
            <img src="src/assets/LogoNav.png" onClick={handleHomeClick}></img>
        </div>
        
        <div className={styles.search}>
            <input type="text" placeholder='Search your medicines' value={searchTerm} onChange={handleOnSearchChange}/>
            <FaSearch className={styles.iconSearch} onClick={hadnleSearchIconClick}/>
        </div>

        <div className={styles.uploadPresOuter}>
            <div className={styles.uploadPres} onClick={handleUploadPrescriptionClick}>
                <FaCloudUploadAlt className={styles.iconUpload} size={"5rem"}/>
                <div> Upload Prescription </div>
            </div>  
        </div>

        <div className={styles.navItems}>
            {navItemsRight.map((item, index) => {
                return <li className={styles.listing} key={index} > <Link className={styles.item} to={`/${item?.toLowerCase() == "home" ? '/' : item?.toLowerCase() }`}>{item}</Link></li>
            })}
        </div>
        
    </div>
  )
}
