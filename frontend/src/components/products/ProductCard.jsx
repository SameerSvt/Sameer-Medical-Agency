import React from 'react'
import styles from './ProductCard.module.css'
import axios from "axios"
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({product}) {
    const { addToCart } = useCart()

    async function handleAddToCartClick(productId, quantity) {
        await addToCart(productId, quantity)
    }

  return (
    <div className={styles.productCard}>
        <div className={styles.productCardImage}>
            <img src={product.image}></img>
        </div>

        <div className={styles.details}>
            <h1>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h1>
            <h2>{product.saltComposition.charAt(0).toUpperCase() + product.saltComposition.slice(1)}</h2>
            <div className={styles.pricing}>
                <h3>₹{product.retailPrice}</h3> <h4>MRP {product.mrp}</h4> <h5>{product.discountPercentage}% off</h5>
            </div>
            <button onClick={() => handleAddToCartClick(product._id, 1)}>Add to Cart</button><br/>
        </div>
    </div>
  )
}
