import styles from './OrdersHistory.module.css'
import { TbFileInvoice } from "react-icons/tb";
import { StarRating } from '../../../components/starRating/StarRating'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function OrdersHistory() {
    const [orderData, setOrderData] = useState([])
    const [filterOrderHistory, setFilterOrderHistory] = useState({
        filterOrder: "",
        dateRange: ""
    })
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await axios.get("/api/v1/orders/get-order-history", {
                    params: {
                        orderStatus: filterOrderHistory.filterOrder,
                        orderDate: filterOrderHistory.dateRange
                    }
                })
                if (response) {
                    setOrderData(response.data?.data)
                }
            } catch (error) {
                alert(error.response?.data?.message)
            }
        }
        fetchOrder()
    }, [filterOrderHistory])

    function handleOnChange(e) {
        const { name, value } = e.target
        setFilterOrderHistory(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div>
            <div className={styles.ordersPage}>
                <div className={styles.filterBox}>
                    <h6> Orders History </h6>
                    <div className={styles.orderFilter}>
                        <div>
                            <pre>Filter Orders:  </pre>
                            <select name="filterOrder" value={filterOrderHistory.filterOrder} onChange={handleOnChange}>
                                <option value="">All</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <pre>Date Range:  </pre>
                            <select name="dateRange" value={filterOrderHistory.dateRange} onChange={handleOnChange}>
                                <option value="">All time</option>
                                <option value="1 month">1 month</option>
                                <option value="3 months">3 months</option>
                                <option value="6 months">6 months</option>
                            </select>
                        </div>
                    </div>

                </div>

                {
                    orderData.length !== 0 ? orderData.map((order) => (
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
                    )) : 
                    <div className={styles.emptyCartPage}>
                            <img src="EmptyOrderHistory.png"></img>
                            <h1>Your Order Timeline is Ready, Let's Begin Your Journey !</h1>
                            <p>Our records shows that your first medical milestone is yet to be added. Take the first step towards better care today.</p>
                            <button onClick={ () => navigate('/')}>FIND YOUR MEDICINES & CARE PRODUCTS NOW</button>
                          </div>
                }
            </div>
        </div>
    )
}