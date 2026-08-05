import styles from './Address.module.css'
import AddressCard from './AddressCard.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Address() {
    const [showCard, setShowCard] = useState(false)

    const [addresses, setAddresses] = useState([])

    const[activeAddressId, setActiveAddressId] = useState()

    const initialAddressData = {
name: "",
        contact: "",
        state: "",
        city: "",
        pincode: "",
        areaDetails: "",
        landmark: ""
    }

    const [addressData, setAddressData] = useState(initialAddressData)

    const state = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" ] 

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

    const addNewAddress = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/v1/address/add-new-address", addressData)
            if (response) {
                alert(response.data?.message || "Address Saved")
                setShowCard(false)
                setAddressData(initialAddressData)
                fetchAddress()
            }
        } catch (error) {
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
                    <button onClick={handleShowCard}><pre>+  ADD</pre></button>
                </div>}

                {
                    showCard && <form onSubmit={addNewAddress}>
                        <div className={styles.editCard}>
                            <div className={styles.card}>
                                <p>Provide details for your delivery location:</p>
                                <div className={styles.nameContainer}>
                                    <div className={styles.name}>
                                        <h3>Name</h3>
                                        <input type="text" name="name" value={addressData.name} onChange={handleOnInputChange} required></input>
                                    </div>
                                    <div className={styles.phone}>
                                        <h3>Contact no.</h3>
                                        <input type="text" name="contact" value={addressData.contact} onChange={handleOnInputChange} required></input>
                                    </div>
                                </div>

                                <div className={styles.state}>
                                    <h3>State</h3>
                                    <select name="state" value={addressData.state} onChange={handleOnInputChange} required>
                                        <option value="" disabled>Select State</option>
                                        {
                                            state.map((item) => (
                                                <option value={item} key={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={styles.cityContainer}>
                                    <div>
                                        <h3>City</h3>
                                        <input type="text" name="city" value={addressData.city} onChange={handleOnInputChange} required></input>
                                    </div>
                                    <div>
                                        <h3>Pincode</h3>
                                        <input type="text" name="pincode" value={addressData.pincode} onChange={handleOnInputChange} required></input>
                                    </div>
                                </div>
                                <div>
                                    <h3>Area Details</h3>
                                    <textarea type="text" name="areaDetails" value={addressData.areaDetails} onChange={handleOnInputChange} required></textarea>
                                </div>
                                <div >
                                    <h3>Landmark</h3>
                                    <input type="text" name="landmark" value={addressData.landmark} onChange={handleOnInputChange} required></input>
                                </div>
                            </div>
                        </div>
                        <button className={styles.saveAddress}>Save New Address</button>
                    </form>
                }
            </div>
        </div>
    )
}