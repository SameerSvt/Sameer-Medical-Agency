import React from 'react'
import styles from './Home.module.css'
import Banner from '../../components/banner/Banner.jsx'
import Category1 from '../../components/category/Category1.jsx'
import Category2 from '../../components/category/Category2.jsx'

export default function Home() {

  const categoryPanel = ["Generic Drugs", "Antibitoics", "Antivirals", "Analgesic", "Gastrointestinal", "Life Saving Medicines", "Cardiac Care", "Diabetes Care", "Surgical Equipment", "Pediatric Care"]

  const stats = ["Stats", "Stats", "Stats", "Stats"]

  const whyChooseUs = ["Choose", "Choose", "Choose", "Choose", "Choose",]

  const test = ["Test", "Test", "Test"]

  return (
    <div>
      
      
        <ul className={styles.catPannel}>
        {categoryPanel.map((item, idx) => (
          <li key={idx} className={styles.catPannelItem}>{item}</li>
        ))}
        </ul>

      <Banner/>
      
      <Category2/>

      <div className={styles.bodyHome}>
    
        <div><img src="src/assets/Wellness.png" className={styles.bannerMiddle}></img></div>

        <Category1 category={stats} heading={"Our Statistics & Track Records"}/>

        <Category1 category={whyChooseUs} heading={"Why Choose SAMEER MEDICAL AGENCY"} style={10}/>

        <Category1 category={test} heading={"What Our Customers Have To Say"} style={20}/>
      
      </div>

    </div>
  )
}
