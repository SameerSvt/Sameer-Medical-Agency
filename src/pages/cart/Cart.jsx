import styles from "./Cart.module.css";
import CartCard from "./CartCard.jsx";
import { HiArrowRightCircle } from "react-icons/hi2";

export default function Cart() {
  return (
    <>
      <div className={styles.cartPage}>

        <div className={styles.cartTotalPhone}>
          <div>
            <p>
              Cart total: <h1>₹361</h1>
            </p>
          </div>
          <hr></hr>
          <div>
            <button className={styles.addressButton}>
              Add Delivery Address{" "}
              <HiArrowRightCircle className={styles.iconRightArrow} />
            </button>
          </div>
        </div>

        <div className={styles.cartItems}>
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />

        </div>

        <div className={styles.checkout}>

          <div className={styles.cartTotal}>
            <div>
              <p>
                Cart total: <h1>₹361</h1>
              </p>
            </div>
            <hr></hr>
            <div>
              <button className={styles.addressButton}>
                Add Delivery Address{" "}
                <HiArrowRightCircle className={styles.iconRightArrow} />
              </button>
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h1>Order Summary</h1>
            <div className={styles.subtotal}>
              <div>Subtotal (4 items):</div> <div>₹392</div>
            </div>
            <div className={styles.subtotal}>
              <div>Delivery Charges:</div> <div>₹49</div>
            </div>
            <div className={`${styles.subtotal} ${styles.discountColor}`}>
              <div>Discount:</div> <div>₹80</div>
            </div>
            <hr></hr>
            <div className={`${styles.subtotal} ${styles.totalAmount}`}>
              <div>Total Amount:</div> <div>₹361</div>
            </div>

            <button>PROCEED TO CHECKOUT</button>
            <div>
              <img src="src/assets/OrderSummary.png"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
