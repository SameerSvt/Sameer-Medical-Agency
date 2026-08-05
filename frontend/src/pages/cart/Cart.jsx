import styles from "./Cart.module.css";
import CartCard from "./CartCard.jsx";
import { HiArrowRightCircle } from "react-icons/hi2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderReviewCard from "../checkout/OrderReviewCard.jsx";
import { useCart } from "../../context/CartContext.jsx";


export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, address, billingDetails, cartCount, fetchCartData, fetchAddress } = useCart()

  function handleCheckout() {
    if (billingDetails.quantity !== 0 && address) {
      navigate("/checkout")
    } else {
      if (billingDetails.quantity === 0) {
        alert("Add product in cart")
      }
      if (!address) {
        alert("Add Address")
      }

    }
  }

  return (
    <>
      {
        billingDetails.quantity !== 0 ?
          <div className={styles.cartPage}>

            {/* for phone */}
            {
              !address?._id && <div className={styles.cartTotalPhone}>
                <div>
                  <p>
                    Cart total: <h1>₹{billingDetails.cartTotal}</h1>
                  </p>
                </div>
                <hr></hr>
                <div>
                  <button className={styles.addressButton} onClick={() => navigate("/address")}>
                    Add Delivery Address
                    <HiArrowRightCircle className={styles.iconRightArrow} />
                  </button>
                </div>
              </div>
            }

            <div className={styles.cartItems}>
              {
                cartItems.map((cartItem) => (
                  <CartCard cartItem={cartItem} key={cartItem?.productId?._id} />
                ))
              }
            </div>

            {/* for desktop/PC */}
            <div className={styles.checkout}>
              {!address?._id && <div className={styles.cartTotal}>
                <div>
                  <p>
                    Cart total: <h1>₹{billingDetails.cartTotal}</h1>
                  </p>
                </div>
                <hr></hr>

                <div>
                  <button className={styles.addressButton} onClick={() => navigate("/address")}>
                    Add Delivery Address{" "}
                    <HiArrowRightCircle className={styles.iconRightArrow} />
                  </button>
                </div>
              </div>}

              {address?._id && <div className={styles.address}>
                <div>
                  <h6>Deliver to :</h6>
                  <hr></hr>
                  <div className={styles.info}>
                    <h5>{address.name}</h5>
                    <p>
                      {`${address.landmark}, ${address.areaDetails}, ${address.city}, ${address.state}, ${address.pincode}`} <br /> Contact: {address.contact}
                    </p>
                  </div>
                </div>


                <div>
                  <button className={styles.addressButton} onClick={() => navigate("/address")}>
                    Change Address{" "}
                    <HiArrowRightCircle className={styles.iconRightArrow} />
                  </button>
                </div>
              </div>}

              <div className={styles.orderSummary}>
                <h1>Order Summary</h1>
                <div className={styles.subtotal}>
                  <div>{`Subtotal (${billingDetails.quantity} items):`}</div> <div>₹{billingDetails.subtotal}</div>
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

                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                <div>
                  <img src="myAssets/OrderSummary.png"></img>
                </div>
              </div>

            </div>

          </div> :
          <div className={styles.emptyCartPage}>
            <img src="EmptyCart.png"></img>
            <h1>Your Cart is Asleep, Add Some Life to It !</h1>
            <p>It seems you haven't added any products to your cart yet. Explore our wide selection of quality medicines and care products to find what you need and bring your cart to life </p>
            <button onClick={() => navigate('/')}>BROWSE MEDICINES & CARE PRODUCTS</button>
          </div>
      }

    </>
  );
}
