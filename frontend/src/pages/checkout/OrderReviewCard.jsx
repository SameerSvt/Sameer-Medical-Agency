import styles from './OrderReviewCard.module.css'
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";
import axios from 'axios'


export default function OrderReviewCard({data, change, setChange}) {

    async function removeItem(productId) {
        try {
            await axios.post("/api/v1/carts/remove-item", {productId})
            setChange(!change)
            alert(`${productId.name} removed`)
        } catch (error) {
            console.error("Unable to remove item", error)
        }
    }

    const info = data?.productId
    return (
        <>
            <div className={styles.product}>
                <div className={styles.productBox}>
                    <img src={info.image}></img>
                </div>

                <div className={styles.productInfo}>
                    <h3> {info.name.charAt(0).toUpperCase() + info.name.slice(1)} </h3>
                    <h4> {info.saltComposition.charAt(0).toUpperCase() + info.saltComposition.slice(1)} </h4>
                    <h5> ₹{info.retailPrice} </h5>
                </div>

                <div className={styles.quantity}>
                    <div className={styles.qty}>
                        <HiMinusCircle className={styles.iconMinus} />
                        <span>1</span>
                        <HiPlusCircle className={styles.iconPlus} />
                    </div>
                    <h5 onClick={() => removeItem(info)}>Remove</h5>
                </div>

            </div>
            <hr></hr>
        </>
    )
}