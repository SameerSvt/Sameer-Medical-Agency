import styles from './AddressCard.module.css'


export default function AddressCard() {
    return (
        <div className={styles.deliveryDetails}>
            <h3>Sameer Srivastav</h3>
            <p>Nirankari Satsang Bhawan, Bethra
                Uttar Pradesh, Sultanpur 228131</p>
            <p> Contact: 9823257694</p>

            <div className={styles.addressButtons}>
                <button className={styles.addressButton}>Edit</button>
                <button className={styles.addressButton}>Select</button>
            </div>
        </div>
    )
}