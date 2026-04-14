import React from 'react'
import styles from './Home.module.css'
import Banner from '../../components/banner/Banner.jsx'
import Category1 from '../../components/category/Category1.jsx'
import Category2 from '../../components/category/Category2.jsx'

export default function Home({setCategoryTerm}) {

  const categoryPanel = ["Generic Drugs", "Antibitoics", "Antivirals", "Analgesic", "Gastrointestinal", "Life Saving Medicines", "Cardiac Care", "Diabetes Care", "Surgical Equipment", "Pediatric Care"]

  const stats = ["/stats/Stats1", "/stats/Stats2", "/stats/Stats3", "/stats/Stats4", "/stats/Stats5"]

  const whyChooseUs = ["/chooseUs/ChooseUs1", "/chooseUs/ChooseUs2", "/chooseUs/ChooseUs3", "/chooseUs/ChooseUs4"]

  const test = ["/test/Test1","/test/Test2", "/test/Test3"]

  return (
    <div>
      
      
        <ul className={styles.catPanel}>
        {categoryPanel.map((item, idx) => (
          <li key={idx} className={styles.catPanelItem}>{item}</li>
        ))}
        </ul>

      <Banner/>
      
      <Category2 setCategoryTerm={setCategoryTerm}/>

      <div className={styles.bodyHome}>
    
        <div><img src="src/assets/Wellness.png" className={styles.bannerMiddle}></img></div>

        <Category1 category={stats} heading={"Our Statistics & Track Records"}/>

        <Category1 category={whyChooseUs} heading={"Why Choose SAMEER MEDICAL AGENCY"} style={14}/>

        <Category1 category={test} heading={"What Our Customers Have To Say"} style={20}/>
      
      </div>

    </div>
  )
}
