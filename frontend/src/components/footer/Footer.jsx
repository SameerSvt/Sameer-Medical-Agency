import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";



export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>

                <div>
                    <h3>Quick Links</h3>
                    <ul>
                        <Link to="/about-us"><li>About Us</li></Link>
                        <Link to="/catalog"><li>Catalog</li></Link>
                        <Link to="/cart"><li>Cart</li></Link>
                        <Link to="/"><li>FAQs</li></Link>
                    </ul>
                </div>

                <div>
                    <h3>Customer Support</h3>
                    <ul>
                        <Link to="/"><li>Contact Us</li></Link>
                        <Link to="/"><li>Shipping Info</li></Link>
                        <Link to="/"><li>Return Policy</li></Link>
                        <Link to="/ordersHistory"><li>Order Tracking</li></Link>
                    </ul>
                </div>

                <div>
                    <h3>Legal & Account</h3>
                    <ul>
                        <Link to="/"><li>Privacy Policy</li></Link>
                        <Link to="/"><li>Terms of Service</li></Link>
                        <Link to="/login"><li>User Login</li></Link>
                        <Link to="/profile"><li>Profile</li></Link>
                    </ul>
                </div>

                <div className={styles.socialLink}>
                    <h3>Follow Us</h3>
                    <div className={styles.icons}>
                        <div><FaFacebook className={styles.socialIcon} /></div>
                        <div><FaSquareInstagram className={styles.socialIcon} /></div>
                        <div><FaTwitter className={styles.socialIcon} /></div>
                        <div><FaWhatsappSquare className={styles.socialIcon} /></div>
                    </div>
                </div>

            </div>
            <h1>© 2026 Sameer Medical Agency. All rights reserved.</h1>
        </div>
    )
}