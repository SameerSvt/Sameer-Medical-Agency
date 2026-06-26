import styles from "./Cart.module.css";
import CartCard from "./CartCard.jsx";
import { HiArrowRightCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderReviewCard from "../checkout/OrderReviewCard.jsx";

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [change, setChange] = useState(false)
  const navigate = useNavigate()

  function handleCheckout() {
    navigate("/checkout")
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get("/api/v1/carts/fetch-cart")
        setCartItems(response?.data?.data?.items)
      } catch (error) {
        console.log("Error occure while fetching cart")
      }
    }
    fetchCart()
  }, [change])

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + (item?.productId.retailPrice * item.quantity), 0)
  const subTotal = cartItems.reduce((acc, item) => acc + (item?.productId.mrp * item.quantity), 0)
  const deliveryCharge = () => {
    if (cartTotal > 499) {
      return 0
    }
    return 49
  }
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.productId.mrp - item.productId.retailPrice) * item.quantity, 0)
  const totalAmount = cartTotal + deliveryCharge()


  return (
    <>
      <div className={styles.cartPage}>

        {/* for phone */}
        <div className={styles.cartTotalPhone}>
          <div>
            <p>
              Cart total: <h1>₹{cartTotal}</h1>
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

          {
            cartItems.map((cartItem) => (
              <CartCard cartItem={cartItem} change={change} setChange={setChange} />
            ))
          }

        </div>

        {/* for desktop/PC */}
        <div className={styles.checkout}>
          <div className={styles.cartTotal}>
            <div>
              <p>
                Cart total: <h1>₹{cartTotal}</h1>
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
              <div>{`Subtotal (${totalQuantity} items):`}</div> <div>₹{subTotal}</div>
            </div>
            <div className={styles.subtotal}>
              <div>Delivery Charge:</div> <div>₹{deliveryCharge()}</div>
            </div>
            <div className={`${styles.subtotal} ${styles.discountColor}`}>
              <div>Discount:</div> <div>₹{totalDiscount}</div>
            </div>
            <hr></hr>
            <div className={`${styles.subtotal} ${styles.totalAmount}`}>
              <div>Total Amount:</div> <div>₹{totalAmount}</div>
            </div>

            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            <div>
              <img src="myAssets/OrderSummary.png"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
