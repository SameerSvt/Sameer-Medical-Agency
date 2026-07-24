import styles from './OrderReviewCard.module.css'
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";
import axios from 'axios'
import { useCart } from '../../context/CartContext.jsx';


export default function OrderReviewCard({data}) {
    const { removeItem, updateQuantity } = useCart()

    async function handleRemoveItem(productId) {
        await removeItem(productId)
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
                    <h5> ₹{info.sellingPrice} </h5>
                </div>
                <div className={styles.quantity}>
                    <div className={styles.qty}>
                        <HiMinusCircle className={styles.iconMinus} onClick={() => updateQuantity(info._id, -1)}/>
                        <span>{data.quantity}</span>
                        <HiPlusCircle className={styles.iconPlus} onClick={() => updateQuantity(info._id, 1)}/>
                    </div>
                    <h5 onClick={() => handleRemoveItem(info) }>Remove</h5>
                </div>

            </div>
            <hr></hr>
        </>
    )
}