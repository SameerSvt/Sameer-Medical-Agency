import React from 'react'
import styles from './Category1.module.css'

export default function category1({category, heading, style}) {
       

  return (
    <>
        <div className={styles.category1}>

            <div className={styles.category1Heading}> {heading} </div>
            <hr></hr>

            <div className={styles.category1Container}>
                {
                    category.map((category, idx) => (
                        <div key={idx}>
                            <img className={styles.category1Image} style={{width: `${style}vw`}}src={`${category}.png`}></img>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
