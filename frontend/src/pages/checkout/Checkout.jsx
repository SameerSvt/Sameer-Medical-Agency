import React from 'react';
import styles from './Checkout.module.css';
import OrderReviewCard from './OrderReviewCard';

export default function Checkout() {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.leftContainer}>

        <div className={styles.address}>
          <h6>Deliver To</h6>
          <hr></hr>
          <div className={styles.deliveryDetails}>
            <h3>Sameer Srivastav</h3>
            <p>Nirankari Satsang Bhawan, Bethra
              Uttar Pradesh, Sultanpur 228131</p>
            <h1> Contact: 9823257694</h1>

            <div className={styles.addressButtons}>

              <button className={styles.addressButton}>Edit</button>
              <button className={styles.addressButton}>Add New Address</button>
            </div>
          </div>

        </div>

        <div className={styles.productContainer}>
          <h6>Order Review</h6>
          <hr></hr>
          <div className={styles.orderItems}>
            <OrderReviewCard/>
            <OrderReviewCard/>
            <OrderReviewCard/>
            <OrderReviewCard/>
            <OrderReviewCard/>
            <OrderReviewCard/>
          </div>
        </div>
        
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.payments}>
          <h6>Payment Method</h6>
          <hr></hr>
          <div className={styles.paymentMethod}>
            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod"></input> <span> Credit/Debit Card </span>
              </label>
              <div>
                <img src="myAssets/cardPayment.png"></img>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod"></input> <span> Net Banking </span>
              </label>
              <div>
                <select>
                  <option default> Select Bank</option>
                  <option> ICICI Bank</option>
                  <option> SBI Bank </option>
                  <option> HDFC Bank </option>
                </select>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod"></input> <span> UPI </span>
              </label>
              <div>
                <img src="myAssets/upiPayment.png"></img>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod"></input> <span> Cash on Delivery (COD) </span>
              </label>
            </div>
          </div>

        </div>
      </div>



      <div className={styles.rightContainer}>
        <div className={styles.orderSummary}>
          <h1>Order Summary</h1>
          <div className={styles.subtotal}>
            <div>Subtotal (4 items):</div> <div>₹799</div>
          </div>
          <div className={styles.subtotal}>
            <div>Delivery Charge:</div> <div>₹49</div>
          </div>
          <div className={`${styles.subtotal} ${styles.discountColor}`}>
            <div>Discount:</div> <div>₹49</div>
          </div>
          <hr></hr>
          <div className={`${styles.subtotal} ${styles.totalAmount}`}>
            <div>Total Amount:</div> <div>₹799</div>
          </div>

          <button className={styles.placeOrderButton}>PLACE ORDER</button>
          <div>
            <img src="myAssets/OrderSummary.png"></img>
          </div>
        </div>
      </div>

    </div>
  );
};

