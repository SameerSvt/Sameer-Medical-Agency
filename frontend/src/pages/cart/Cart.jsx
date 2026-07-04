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
  const [address, setAddress] = useState({})
  const [billingDetails, setBillingDetails] = useState({})
  const navigate = useNavigate()

  function handleCheckout() {
    navigate("/checkout")
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get("/api/v1/carts/fetch-cart")
        if(response) {
          setCartItems(response?.data?.data?.items)
        }

        const billingResponse = await axios.get("/api/v1/carts/billing-details")
        if(billingResponse) {
          setBillingDetails(billingResponse.data?.data)
        }

        const getUser = await axios.get("/api/v1/users/current-user?populate=address")
        if(getUser) {
          setAddress(getUser.data?.data?.activeAddressId)
        }
      } catch (error) {
        console.log("Error occure while fetching cart")
      }
    }
    fetchCart()
  }, [change])
  
  return (
    <>
      <div className={styles.cartPage}>

        {/* for phone */}
        <div className={styles.cartTotalPhone}>
          <div>
            <p>
              Cart total: <h1>₹{billingDetails.cartTotal}</h1>
            </p>
          </div>
          <hr></hr>
          <div>
            <button className={styles.addressButton} onClick={() => navigate("address")}>
              Add Delivery Address
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
                  {`${address.landmark}, ${address.areaDetails}, ${address.city}, ${address.state}, ${address.pincode}`}
                </p>
                <h4>Contact: {address.contact}</h4> 
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
      </div>
    </>
  );
}
