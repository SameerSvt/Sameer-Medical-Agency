import styles from './Address.module.css'
import AddressCard from './AddressCard.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Address() {
    const [showCard, setShowCard] = useState(false)

    const [addresses, setAddresses] = useState([])

    const[activeAddressId, setActiveAddressId] = useState()

    const [addressData, setAddressData] = useState({
        name: "",
        contact: "",
        state: "",
        city: "",
        pincode: "",
        areaDetails: "",
        landmark: ""
    })

    async function fetchAddress() {
        try {
            const response = await axios.get("/api/v1/address/get-address")
            if (response) {
                setAddresses(response.data?.data)
            }
            const selectedAddress  = await axios.get("/api/v1/users/current-user")
            if(selectedAddress) {
                setActiveAddressId(selectedAddress.data?.data?.activeAddressId)
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Somethig went wrong while fetching address from Database")
        }
    }

    async function selectAddress(addressId) {
        try {
            const response = await axios.patch("/api/v1/users/select-address", {addressId})
            if(response) {
                setActiveAddressId(response?.data?.data?._id)
            }
        } catch (error) {
            console.error(error.response?.data?.message)
        }
    }

    function handleOnInputChange(e) {
        const { name, value } = e.target
        setAddressData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleShowCard() {
        setShowCard(true)
    }

    const addNewAddress = async () => {
        try {
            const response = await axios.post("/api/v1/address/add-new-address", addressData)
            if (response) {
                alert(response.data?.message || "Address Saved")
                setShowCard(false)
                fetchAddress()
            }
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Unable to save address")
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [])


    return (
        <div className={styles.addressPage}>
            <div className={styles.leftContainer}>
                <div className={styles.address}>
                    <h6>Your Saved Addresses</h6>
                    {
                        addresses.map((item) => (
                            <AddressCard key={item._id} data={item} activeAddressId={activeAddressId} selectAddress={selectAddress}/>
                        ))
                    }
                </div>
            </div>

            <div className={styles.rightContainer}>
                <h6>Add New Address</h6>

                {!showCard && <div className={styles.editCardButton}>
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
                                        <input type="text" name="name" value={addressData.name} onChange={handleOnInputChange}></input>
                                    </div>
                                    <div className={styles.phone}>
                                        <h3>Contact no.</h3>
                                        <input type="text" name="contact" value={addressData.contact} onChange={handleOnInputChange}></input>
                                    </div>
                                </div>

                                <div className={styles.state}>
                                    <h3>State</h3>
                                    <select name="state" value={addressData.state} onChange={handleOnInputChange}>
                                        <option value="" disabled>Select State</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                    </select>
                                </div>
                                <div className={styles.cityContainer}>
                                    <div>
                                        <h3>City</h3>
                                        <input type="text" name="city" value={addressData.city} onChange={handleOnInputChange}></input>
                                    </div>
                                    <div>
                                        <h3>Pincode</h3>
                                        <input type="text" name="pincode" value={addressData.pincode} onChange={handleOnInputChange}></input>
                                    </div>
                                </div>
                                <div>
                                    <h3>Area Details</h3>
                                    <textarea type="text" name="areaDetails" value={addressData.areaDetails} onChange={handleOnInputChange}></textarea>
                                </div>
                                <div >
                                    <h3>Landmark</h3>
                                    <input type="text" name="landmark" value={addressData.landmark} onChange={handleOnInputChange}></input>
                                </div>
                            </div>
                        </div>
                        <button className={styles.saveAddress} onClick={addNewAddress}>Save New Address</button>
                    </div>
                }
            </div>
        </div>
    )
}