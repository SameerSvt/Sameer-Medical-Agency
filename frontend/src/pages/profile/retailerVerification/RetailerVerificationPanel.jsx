import styles from './RetailerVerificationPanel.module.css'
import ReactDOM from "react-dom"
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext.jsx';

export default function RetailerVerificationPanel({ isVisible, onClose }) {
    const {checkExistingSession} = useAuth()
    const [info, setInfo] = useState({
        firmName: "",
        drugLicenseNumber: "",
        gstNumber: ""
    })

    function handleOnChange(e) {
        const {name, value} = e.target
        setInfo((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(value)
    }

    async function verifyRetailerDetails(e) {
        e.preventDefault()
        try {
            const response = await axios.patch("/api/v1/users/retailer-verification", info)
            if(response) {
                alert(response.data?.message || "Verification details submitted successfully!")
                checkExistingSession()
                onClose()
            }
        } catch (error) {
            alert(error.response.data?.message || "Something went wrong while submitting verification")
        }
    }

    if (!isVisible) return null;

    const panelContent = (
        <div id="retailer-panel-wrapper" className={styles.retailerPanelWrapper} onClick={onClose}>

            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>

                <header>
                    <div className={styles.iconClosePanel}>
                        <IoClose onClick={onClose} className={styles.icon} />
                    </div>
                    <div className={styles.image}>
                        <img src="profile/Become_Retailer.png"></img>
                    </div>
                    <h1>Apply to Become a Verified Retailer</h1>
                    <p>Submit your details to start sourcing quality medicines at wholesale rates.</p>

                </header>

                <form className={styles.formRetailerVerification} onSubmit={verifyRetailerDetails}>
                    <div>
                        <div className={styles.firmName}>
                            <label htmlFor="firmName"> Valid Firm Name <br /></label>
                            <input id="firmName" type="text" name="firmName" value={info.firmName} onChange={handleOnChange} placeholder='Enter complete firm name' required></input>
                        </div>

                        <div className={styles.firmName}>
                            <label htmlFor="dl"> Drug License Number <br /></label>
                            <input id="dl" type="text" name="drugLicenseNumber" value={info.drugLicenseNumber} onChange={handleOnChange} placeholder='Ex: LIC/G/45678' required></input>
                        </div>

                        <div className={styles.firmName}>
                            <label htmlFor="gst"> GST Number <br /></label>
                            <input id="gst" type="text" name="gstNumber" value={info.gstNumber} onChange={handleOnChange} placeholder='Ex: 12AAAAA0000A1Z5' required></input>
                        </div>
                    </div>

                    <div className={styles.verifyButton}>
                        <button type="submit"> Submit Application for Verififcation </button>
                    </div>
                </form>


            </div>

        </div>
    )

    return ReactDOM.createPortal(panelContent, document.body)
}