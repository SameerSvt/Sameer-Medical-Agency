import React from 'react'
import styles from './Banner.module.css'
import { useNavigate } from 'react-router-dom'

export default function Banner() {
  const navigate = useNavigate()

  function handleHeroClick() {
    navigate("/catalog")
  }

  return (
    <div>
        <div className={styles.banners}>
            <img src="myAssets/Banner2.png" className={styles.bannersImg} onClick={ handleHeroClick}></img>
        </div>
    </div>
  
  )
}
