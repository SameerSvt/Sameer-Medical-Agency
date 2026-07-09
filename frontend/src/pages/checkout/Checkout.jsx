import React from 'react';
import styles from './Checkout.module.css';
import OrderReviewCard from './OrderReviewCard';
import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from '../../context/CartContext.jsx';

export default function Checkout() {
  const [paymentOption, setPaymentOption] = useState("")
  const {cartItems, address, billingDetails, fetchCartData} = useCart()
  const navigate = useNavigate()

  async function placeOrder() {
    try {
      const response = await axios.post("/api/v1/orders/checkout", {paymentOption})
      if(response) {
        fetchCartData()
        alert(response.data?.message || "Order Placed Successufully")
        navigate("/ordersHistory")
      }
    } catch (error) {
      alert(error.response.data.message)
      console.error("Unable to place Order", error)
    }
  }

  return (
    <div className={styles.checkoutPage}>

      <div className={styles.leftContainer}>
        <div className={styles.address}>
          <h6>Deliver To</h6>
          <hr></hr>
          <div className={styles.deliveryDetails}>
            <h3>{address?.name}</h3>
            <p>{`${address?.landmark}, ${address?.areaDetails}, ${address?.city}, ${address?.state}, ${address?.pincode}`}</p>
            <h1> Contact: {address?.contact}</h1>
            <div className={styles.addressButtons}>
              <button className={styles.addressButton} onClick={() => navigate("/address")}>Change Address</button>
            </div>
          </div>

        </div>

        <div className={styles.productContainer}>
          <h6>Order Review</h6>
          <hr></hr>
          <div className={styles.orderItems}>
            {cartItems?.map((item) => (
              <OrderReviewCard key={item._id} data={item}/>
            ))}
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
                <input type="radio" name="paymentMethod" value="Credit/Debit Card" checked={paymentOption === "Credit/Debit Card"} onChange={(e) => setPaymentOption(e.target.value)}></input> <span> Credit/Debit Card </span>
              </label>
              <div>
                <img src="myAssets/cardPayment.png"></img>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod" value="Net Banking" checked={paymentOption === "Net Banking"} onChange={(e) => setPaymentOption(e.target.value)}></input> <span> Net Banking </span>
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
                <input type="radio" name="paymentMethod" value="UPI" checked={paymentOption === "UPI"} onChange={(e) => setPaymentOption(e.target.value)}></input> <span> UPI </span>
              </label>
              <div>
                <img src="myAssets/upiPayment.png"></img>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <label>
                <input type="radio" name="paymentMethod" value="Cash on Delivery (COD)" checked={paymentOption === "Cash on Delivery (COD)"} onChange={(e) => setPaymentOption(e.target.value)}></input> <span> Cash on Delivery (COD) </span>
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.orderSummary}>
          <h1>Order Summary</h1>
          <div className={styles.subtotal}>
            <div>Subtotal ({billingDetails.quantity} items):</div> <div>₹{billingDetails.subtotal}</div>
          </div>
          <div className={styles.subtotal}>
            <div>Delivery Charge:</div> <div>₹{billingDetails.deliveryCharge}</div>
          </div>
          <div className={`${styles.subtotal} ${styles.discountColor}`}>
            <div>Discount:</div> <div>₹{billingDetails.discount}</div>
          </div>
          <hr></hr>
          <div className={`${styles.subtotal} ${styles.totalAmount}`}>
            <div>Total Amount:</div> <div>₹{billingDetails.totalAmount}</div>
          </div>
          <button className={styles.placeOrderButton} onClick={() => placeOrder()}>PLACE ORDER</button>
          <div>
            <img src="myAssets/OrderSummary.png"></img>
          </div>
        </div>
      </div>

    </div>
  );
};

