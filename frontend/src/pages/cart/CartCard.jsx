import React from "react";
import styles from "./CartCard.module.css";
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";
import axios from "axios"
import { useCart } from "../../context/CartContext.jsx";

export default function cartCard({cartItem}) {
  const { removeItem, updateQuantity } = useCart()

  const product = cartItem?.productId;

  if (!product) return null;

  return (
    <>
      <div className={styles.card}>

        <div className={styles.cardImage}>
          <img src={product.image}></img>
        </div>

        <div className={styles.cardInfo}>
          <h1>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h1>
          <h2>{`${product.saltComposition.charAt(0).toUpperCase() + product.saltComposition.slice(1)} 
          (${product.category.charAt(0).toUpperCase() + product.category.slice(1)})`}</h2>
          <div className={styles.pricing}>
            <h3>₹{product.retailPrice}</h3> <h4>MRP {product.mrp}</h4> <h5>{product.discountPercentage}% off</h5>
          </div>
        </div>

        <div className={styles.quantity}>
          <div className={styles.qty}>
            <HiMinusCircle className={styles.iconMinus} onClick={() => updateQuantity(product._id, -1)}/>
            <span>{cartItem.quantity}</span>
            <HiPlusCircle className={styles.iconPlus} onClick={() => updateQuantity(product._id, 1)}/>
          </div>
          <h6 onClick={() => removeItem(product)}>Remove</h6>
        </div>

      </div>
      <hr className={styles.hrDivide}></hr>
    </>
  );
}

