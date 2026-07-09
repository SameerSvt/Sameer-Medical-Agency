import styles from './AddressCard.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'


export default function AddressCard({ data, activeAddressId, selectAddress }) {
    const {fetchAddress} = useCart()

    async function handleSelectAddressClick(addressId) {
       await selectAddress(addressId)
       await fetchAddress()

    }

    const isSelected = activeAddressId === data._id

    return (
        <div className={`${styles.deliveryDetails} ${isSelected ? styles.deliveryDetailsOnSelect : ''}`}>
            <h3>{data.name}</h3>
            <p>{`${data.landmark}, ${data.areaDetails},
                ${data.city} - ${data.state} (${data.pincode})`}</p>
            <p> Contact: {data.contact}</p>

            <div className={styles.addressButtons}>
                <button className={styles.addressButton}>Edit</button>
                <button className={styles.addressButton} disabled={isSelected} style={isSelected ? {backgroundColor: "gray"} : {}} onClick={() => handleSelectAddressClick(data._id)}>{isSelected ? "Selected" : "Select"}</button>
            </div>
        </div>
    )
}