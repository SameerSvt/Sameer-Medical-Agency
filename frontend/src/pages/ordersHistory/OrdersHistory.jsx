import styles from './OrdersHistory.module.css'
import { TbFileInvoice } from "react-icons/tb";
import { StarRating } from '../../components/starRating/StarRating'

export default function OrdersHistory() {
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

            <div className={styles.orderCard}>
                <div className={styles.header}>
                    <h1>Order ID: <span>#SAM-12345</span></h1>
                    <h1>Ordern Date: <span>15 June, 2026</span></h1>
                    <h1> Order Status: <span>Delivered</span></h1>
                    <h1>Order Amount: <span>₹768</span></h1>
                </div>
                <hr></hr>
                <div className={styles.orderDetails}>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹75 x 3 units = ₹225</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className={styles.rateDelivery}>
                        <h6>How was your Experience ?</h6>
                        <StarRating/>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.buyAgain}>Buy Again</button>
                        <button className={styles.viewDetails}>View Details</button>
                        <div className={styles.downloadInvoice}>
                            <TbFileInvoice className={styles.fileIcon}/>
                            <a href="#" >Download Invoice</a>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.orderCard}>
                <div className={styles.header}>
                    <h1>Order ID: <span>#SAM-12345</span></h1>
                    <h1>Ordern Date: <span>15 June, 2026</span></h1>
                    <h1> Order Status: <span>Delivered</span></h1>
                    <h1>Order Amount: <span>₹768</span></h1>
                </div>
                <hr></hr>
                <div className={styles.orderDetails}>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹75 x 3 units = ₹225</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className={styles.rateDelivery}>
                        <h6>How was your Experience ?</h6>
                        <StarRating/>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.buyAgain}>Buy Again</button>
                        <button className={styles.viewDetails}>View Details</button>
                        <div className={styles.downloadInvoice}>
                            <TbFileInvoice className={styles.fileIcon}/>
                            <a href="#" >Download Invoice</a>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.orderCard}>
                <div className={styles.header}>
                    <h1>Order ID: <span>#SAM-12345</span></h1>
                    <h1>Ordern Date: <span>15 June, 2026</span></h1>
                    <h1> Order Status: <span>Delivered</span></h1>
                    <h1>Order Amount: <span>₹768</span></h1>
                </div>
                <hr></hr>
                <div className={styles.orderDetails}>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹75 x 3 units = ₹225</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className={styles.rateDelivery}>
                        <h6>How was your Experience ?</h6>
                        <StarRating/>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.buyAgain}>Buy Again</button>
                        <button className={styles.viewDetails}>View Details</button>
                        <div className={styles.downloadInvoice}>
                            <TbFileInvoice className={styles.fileIcon}/>
                            <a href="#" >Download Invoice</a>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.orderCard}>
                <div className={styles.header}>
                    <h1>Order ID: <span>#SAM-12345</span></h1>
                    <h1>Ordern Date: <span>15 June, 2026</span></h1>
                    <h1> Order Status: <span>Delivered</span></h1>
                    <h1>Order Amount: <span>₹768</span></h1>
                </div>
                <hr></hr>
                <div className={styles.orderDetails}>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹75 x 3 units = ₹225</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className={styles.rateDelivery}>
                        <h6>How was your Experience ?</h6>
                        <StarRating/>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.buyAgain}>Buy Again</button>
                        <button className={styles.viewDetails}>View Details</button>
                        <div className={styles.downloadInvoice}>
                            <TbFileInvoice className={styles.fileIcon}/>
                            <a href="#" >Download Invoice</a>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.orderCard}>
                <div className={styles.header}>
                    <h1>Order ID: <span>#SAM-12345</span></h1>
                    <h1>Ordern Date: <span>15 June, 2026</span></h1>
                    <h1> Order Status: <span>Delivered</span></h1>
                    <h1>Order Amount: <span>₹768</span></h1>
                </div>
                <hr></hr>
                <div className={styles.orderDetails}>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹75 x 3 units = ₹225</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>

                        <div className={styles.product}>
                            <div className={styles.image}>
                                <img src="productImage/Antibiotics.png"></img>
                            </div>
                            <div className={styles.productDetails}>
                                <h4> Zifi 200 Tab</h4>
                                <span>₹25 x 3 units = ₹75</span>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className={styles.rateDelivery}>
                        <h6>How was your Experience ?</h6>
                        <StarRating/>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.buyAgain}>Buy Again</button>
                        <button className={styles.viewDetails}>View Details</button>
                        <div className={styles.downloadInvoice}>
                            <TbFileInvoice className={styles.fileIcon}/>
                            <a href="#" >Download Invoice</a>
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    )
}