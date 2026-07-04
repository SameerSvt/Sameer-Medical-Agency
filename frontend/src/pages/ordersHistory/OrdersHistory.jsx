import styles from './OrdersHistory.module.css'
import { TbFileInvoice } from "react-icons/tb";
import { StarRating } from '../../components/starRating/StarRating'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersHistory() {
    const [orderData, setOrderData] = useState([])
    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await axios.get("/api/v1/orders/get-order-history")
                if (response) {
                    setOrderData(response.data?.data)
                }
            } catch (error) {
                alert(error.response?.data?.message)
            }
        }
        fetchOrder()
    }, [])


    return (
        <div className={styles.ordersPage}>
            <div className={styles.filterBox}>
                <h6> Orders History </h6>
                <div className={styles.orderFilter}>
                    <div>
                        <pre>Filter Orders:  </pre>
                        <select>
                            <option default>All</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Processing</option>
                        </select>
                    </div>
                    <div>
                        <pre>Date Range:  </pre>
                        <select>
                            <option default>28 Days</option>
                            <option>3 months</option>
                            <option>6 months</option>
                            <option>All time</option>
                        </select>
                    </div>
                </div>

            </div>

            {
                orderData.map((order) => (
                    <div key={order._id} className={styles.orderCard}>
                        <div className={styles.header}>
                            <h1>Order ID: <span>#SAM-{order._id.substring(18).toUpperCase()}</span></h1>
                            <h1>Ordern Date: <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></h1>
                            <h1> Order Status: <span>{order.orderStatus}</span></h1>
                            <h1>Order Amount: <span>₹{order.billingDetails.totalAmount}</span></h1>
                        </div>
                        <hr></hr>
                        <div className={styles.orderDetails}>
                            <div className={styles.products}>
                                {
                                    order.items.map((item) => (
                                        <div key={item._id} className={styles.product}>
                                            <div className={styles.image}>
                                                <img src={item.productId.image}></img>
                                            </div>
                                            <div className={styles.productDetails}>
                                                <h4> {item.productId.name.charAt(0).toUpperCase() + item.productId.name.slice(1)} </h4>
                                                <span>₹{item.productId.retailPrice} x {item.quantity} units = ₹{Number(item.productId.retailPrice) * Number(item.quantity)}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={styles.rateDelivery}>
                                <h6>How was your Experience ?</h6>
                                <StarRating />
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.buyAgain}>Buy Again</button>
                                <button className={styles.viewDetails}>View Details</button>
                                <div className={styles.downloadInvoice}>
                                    <TbFileInvoice className={styles.fileIcon} />
                                    <a href="#" >Download Invoice</a>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}