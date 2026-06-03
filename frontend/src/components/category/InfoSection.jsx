import React from "react";
import styles from "./InfoSection.module.css";

export default function infoSection() {

  const stats = ["/stats/Stats1", "/stats/Stats2", "/stats/Stats3", "/stats/Stats4", "/stats/Stats5"]

  const whyChooseUs = ["/chooseUs/ChooseUs1", "/chooseUs/ChooseUs2", "/chooseUs/ChooseUs3", "/chooseUs/ChooseUs4"]

  const test = ["/test/Test1", "/test/Test2", "/test/Test3"]

  return (
    <>
      <div className={styles.info}>
        <div className={styles.infoHeading}> Our Statistics & Track Records </div>
        <hr></hr>

        <div className={styles.infoContainer}>
          {stats.map((category, idx) => (
            <div key={idx}>
              <img
                className={`${styles.infoImage} ${styles.widthImage1}`}
                src={`${category}.png`}
              ></img>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoHeading}> Why Choose SAMEER MEDICAL AGENCY </div>
        <hr></hr>

        <div className={styles.infoContainer}>
          {whyChooseUs.map((category, idx) => (
            <div key={idx}>
              <img
                className={`${styles.infoImage} ${styles.widthImage2}`}
                src={`${category}.png`}
              ></img>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoHeading}> What Our Customers Have To Say </div>
        <hr></hr>

        <div className={styles.infoContainer}>
          {test.map((category, idx) => (
            <div key={idx}>
              <img
                className={`${styles.infoImage} ${styles.widthImage3}`}
                src={`${category}.png`}
              ></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
