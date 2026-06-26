import styles from './OrderReviewCard.module.css'
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";


export default function OrderReviewCard() {
    return (
        <>
            <div className={styles.product}>
                <div className={styles.productBox}>
                    <img src="productImage/Antibiotics.png"></img>
                </div>

                <div className={styles.productInfo}>
                    <h3> Dolo 650 Tab </h3>
                    <h4> Paracetamol IP </h4>
                    <h5> ₹30 </h5>
                </div>

                <div className={styles.quantity}>
                    <div className={styles.qty}>
                        <HiMinusCircle className={styles.iconMinus} />
                        <span>1</span>
                        <HiPlusCircle className={styles.iconPlus} />
                    </div>
                    <h5>Remove</h5>
                </div>

            </div>
            <hr></hr>
        </>
    )
}