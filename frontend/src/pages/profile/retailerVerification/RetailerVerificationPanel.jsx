import styles from './RetailerVerificationPanel.module.css'
import ReactDOM from "react-dom"
import { IoClose } from "react-icons/io5";

export default function RetailerVerificationPanel({ isVisible, onClose }) {

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

                <form className={styles.formRetailerVerification}>
                    <div>
                        <div className={styles.firmName}>
                            <label htmlFor="firmName"> Valid Firm Name <br /></label>
                            <input id="firmName" type="text" placeholder='Enter complete firm name' required></input>
                        </div>

                        <div className={styles.firmName}>
                            <label htmlFor="firmName"> Drug License Number <br /></label>
                            <input id="firmName" type="text" placeholder='Ex: LIC/G/45678' required></input>
                        </div>

                        <div className={styles.firmName}>
                            <label htmlFor="firmName"> GST Number <br /></label>
                            <input id="firmName" type="text" placeholder='Ex: 12AAAAA0000A1Z5' required></input>
                        </div>


                    </div>

                    <div className={styles.verifyButton}>
                        <button>Submit Application for Verififcation</button>
                    </div>
                </form>


            </div>

        </div>
    )

    return ReactDOM.createPortal(panelContent, document.body)
}