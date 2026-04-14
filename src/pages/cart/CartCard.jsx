import React from "react";
import styles from "./CartCard.module.css";
import { HiMinusCircle } from "react-icons/hi";
import { HiPlusCircle } from "react-icons/hi";

export default function cartCard() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}>
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
        </div>
      </div>
      <hr className={styles.hrDivide}></hr>
    </>
  );
}
