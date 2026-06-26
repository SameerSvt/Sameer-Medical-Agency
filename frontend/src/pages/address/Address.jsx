import styles from './Address.module.css'
import AddressCard from './AddressCard.jsx'
import { useState } from 'react'

export default function Address() {
    const [showCard, setShowCard] = useState(false)

    function handleShowCard() {
        setShowCard(true)
    }

    function handleDisableCard() {
        setShowCard(false)
    }

    return (
        <div className={styles.addressPage}>
            <div className={styles.leftContainer}>
                <div className={styles.address}>
                    <h6>Your Saved Addresses</h6>
                    <AddressCard />
                    <AddressCard />
                    <AddressCard />
                    <AddressCard />


                </div>
            </div>

            <div className={styles.rightContainer}>
                <h6>Add New Address</h6>

                { !showCard && <div className={styles.editCardButton}>
                    <button onClick={handleShowCard}><pre>+  Add</pre></button>
                </div>}

                {
                    showCard && <div >
                    <div className={styles.editCard}>
                       <div className={styles.card}>
                         <p>Provide details for your delivery location:</p>
                        <div className={styles.nameContainer}>
                            <div className={styles.name}>
                                <h3>Name</h3>
                                <input type="text" placeholder='e.g., Sameer Srivastav'></input>
                            </div>
                            <div className={styles.phone}>
                                <h3>Contact no.</h3>
                                <input type="text" placeholder='e.g., 958014XXXX'></input>
                            </div>
                        </div>

                        <div className={styles.state}>
                            <h3>State</h3>
                            <select>
                                <option default>Select State</option>
                                <option>Uttar Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Rajahthan</option>
                                <option>Punjab</option>
                                <option>Tamil Nadu</option>
                            </select>
                        </div>
                        <div className={styles.cityContainer}>
                            <div>
                                <h3>City</h3>
                                <input type="text" placeholder='e.g., Kanpur'></input>
                            </div>
                            <div>
                                <h3>Pincode</h3>
                                <input type="text" placeholder='e.g., 208024'></input>
                            </div>
                        </div>
                        <div>
                            <h3>Area Details</h3>
                            <textarea type="text" placeholder='Flat/Hose/Apartment/Street'></textarea>
                        </div>
                        <div >
                            <h3>Landmark</h3>
                            <input type="text" placeholder='e.g., Opp. Civil Hospital'></input>
                        </div>
                       </div>
                    </div>
                    <button className={styles.saveAddress} onClick={handleDisableCard}>Save New Address</button>
                </div>
                }
            </div>
        </div>
    )
}