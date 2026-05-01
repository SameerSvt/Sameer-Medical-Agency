import React from 'react'
import styles from './Home.module.css'
import Banner from '../../components/banner/Banner.jsx'
import InfoSection from '../../components/category/InfoSection.jsx'
import Category2 from '../../components/category/Category2.jsx'
import { useNavigate } from 'react-router-dom'

export default function Home({ setCategoryTerm }) {
  const navigate = useNavigate()

  const categoryPanel = [
    "Generic Drugs",
    "Surgical Equipment",
    "Oncology Drugs",
    "Cardiac Care",
    "Emergency Meds",
    "Personal Care",
    "Pediatric Care",
    "Diabetes Care",
    "Diagnostic Tools",
     "Life Saving Medicines",
    "Antibiotics"
  ];

  const stats = ["/stats/Stats1", "/stats/Stats2", "/stats/Stats3", "/stats/Stats4", "/stats/Stats5"]

  const whyChooseUs = ["/chooseUs/ChooseUs1", "/chooseUs/ChooseUs2", "/chooseUs/ChooseUs3", "/chooseUs/ChooseUs4"]

  const test = ["/test/Test1", "/test/Test2", "/test/Test3"]

  function handleCategoryPanelClick(cat) {
    setCategoryTerm(cat)
    navigate('/catalog')
  }

  return (
    <div>

      <ul className={styles.catPanel}>
        {categoryPanel.map((item, idx) => (
          <li key={idx} className={styles.catPanelItem} onClick={() => { handleCategoryPanelClick(item) }}>{item}</li>
        ))}
      </ul>

      <Banner />

      <Category2 setCategoryTerm={setCategoryTerm} />

      {/* <div><img src="src/assets/Catalog.png" className={styles.bannerTesting}></img></div>

      <Category2 setCategoryTerm={setCategoryTerm} />

       <div><img src="src/assets/BannerTopc.png" className={styles.bannerTesting}></img></div>

      <Category2 setCategoryTerm={setCategoryTerm} /> */}

      <div className={styles.bodyHome}>

        <div><img src="src/assets/Wellness.png" className={styles.bannerMiddle}></img></div>

        <InfoSection />

      </div>

    </div>
  )
}
