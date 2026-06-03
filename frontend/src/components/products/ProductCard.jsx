import React from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({product}) {
  return (
    <div className={styles.productCard}>
        <div className={styles.productCardImage}>
            <img src={product.imageUrl}></img>
        </div>

        <div className={styles.details}>
            <h1>{product.name}</h1>
            <h2>{product.salt}</h2>
            <div className={styles.pricing}>
                <h3>₹{product.price}</h3> <h4>MRP {product.mrp}</h4> <h5>{product.discount}% off</h5>
            </div>
            <button>Add to Cart</button><br/>
        </div>
    </div>
  )
}
