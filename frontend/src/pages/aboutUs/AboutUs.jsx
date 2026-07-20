import styles from './AboutUs.module.css'
import { useState } from 'react'
import InfoSection from '../../components/category/InfoSection.jsx'

export default function AboutUs() {

  return (
    <div className={styles.aboutUsPage}>
      <div>
        <img src="aboutUs/AboutUsHero.png" className={styles.HeroImg}></img>
      </div>

      <div className={styles.text1}>
        <h1>What is Sameer Medical Agency ?</h1>
        <hr></hr>
        <p>At Sameer Medical Agency, we believe that healthcare is more than just a service—it is a lifelong commitment to quality care, accessibility, and absolute trust. Operating as a premier healthcare supply and pharmaceutical distribution platform, we serve as the vital link between global medical innovations and the communities that depend on them most. Every product we supply passes through rigorous quality controls to ensure you receive 100% genuine medical supplies with transparent batch tracking. From high-demand pharmaceuticals to critical emergency medicine and everyday wellness essentials, our advanced regional logistics infrastructure is engineered to deliver with speed, precision, and complete safety. We don’t just deliver medicines; we deliver peace of mind, working relentlessly to make high-quality healthcare both affordable and dependable for every healthcare provider, retailer, and patient we serve. Your health will always remain our highest calling, our deepest purpose, and our ultimate commitment.</p>
      </div>
      <div >
        <img src="aboutUs/StoryMission.png" className={styles.storyImg}></img>
      </div>
      <div>
        <img src="aboutUs/CorePillars.png" className={styles.corePillars}></img>
      </div>
      <div className={styles.wellnessHub}>
        <img src="aboutUs/WellnessHub.png"></img>
      </div>
      <div className={styles.wellnessJourney}>
        <img src="aboutUs/WellnessJourney.png"></img>
      </div>
      <div>
        <img src="aboutUs/Infrastructure.png" className={styles.infrastructure}></img>
      </div>

      <div className={styles.addressMap}>
        <div className={styles.address}>
          <h2>Find Our hub</h2>
          <h1>Sameer Medical Agency</h1>
          <p>Dostpur Near Block Chauraha, Sultanpur <br/>
          Uttar Pradesh (228131)</p>
          <a href="https://maps.app.goo.gl/PrrPy26oGfTvGJQN6"> Open in Google Maps </a>
        </div>
        
        <div className={styles.map}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.6810662127173!2d82.46603421278644!3d26.272012576939094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399089d0adc116b9%3A0x83443fe6aff75b9!2sSameer%20medical%20agency!5e0!3m2!1sen!2sin!4v1783764288189!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>

    </div>
  )
}
