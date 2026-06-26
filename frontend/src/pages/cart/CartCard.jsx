import React from "react";
import styles from "./CartCard.module.css";
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";
import axios from "axios"

export default function cartCard({cartItem, change, setChange}) {
  async function handleRemoveClick(productId) {
    try {
      const response = await axios.post("/api/v1/carts/remove-item", {productId})
      setChange(!change)
      alert(`${productId.name} removed from cart`)
    } catch (error) {
      console.error("Error occured while removing item from cart")
    }
  }

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
            <HiMinusCircle className={styles.iconMinus} />
            <span>{cartItem.quantity}</span>
            <HiPlusCircle className={styles.iconPlus} />
          </div>
          <h6 onClick={() => handleRemoveClick(product)}>Remove</h6>
        </div>

      </div>
      <hr className={styles.hrDivide}></hr>
    </>
  );
}



{/* <div className={styles.cardImage}>
          <img src="/productImage/Diagnostic_Tools.png"></img>
        </div>

        <div className={styles.cardInfo}>
          <h1>Product Name</h1>
          <h2>Product Composition, Category</h2>
          <div className={styles.pricing}>
            <h3>₹78</h3> <h4>MRP 98</h4> <h5>19% off</h5>
          </div>
        </div>

        <div className={styles.quantity}>
          <div className={styles.qty}>
            <HiMinusCircle className={styles.iconMinus} /> 
            <span>1</span>
            <HiPlusCircle className={styles.iconPlus} />
          </div>
          <a href="#">Remove</a>
        </div> */}
