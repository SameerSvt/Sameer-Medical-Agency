import React from 'react'
import styles from './Category2.module.css'

export default function category2() {
const category = ["Category", "Category", "Category", "Category", "Category", "Category", "Category", "Category", "Category", "Category", "Category" ]

  return (
    <>
        <div className={styles.category2}>
            <div className={styles.category2Heading}> Browse by Categories </div>
            <hr></hr>
            <div className={styles.category2Container}>
                {
                    category.map((category, idx) => (
                        <div key={idx} className={styles.category2Box}>
                            <img className={styles.category2Image} src={`/src/assets/${category}.png`}></img>
                            <p className={styles.category2Description}>Precision instruments for health monitoring.</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
