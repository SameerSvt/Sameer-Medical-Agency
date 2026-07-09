import styles from './AboutUs.module.css'
import { useState } from 'react'

export default function AboutUs() {

  return (
    <div>
      <div>
        <img src="myAssets/AboutUs.png" className={styles.profileImg}></img>
      </div>

      <div className={styles.working}>Coming Soon</div>
    </div>
  )
}
