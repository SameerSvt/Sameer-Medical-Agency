import React from 'react'
import styles from './Category2.module.css'
import { useNavigate } from 'react-router-dom'

export default function category2({setCategoryTerm}) {
    const navigate = useNavigate()
    
    const category = [
    {url: 'Generic.png', name: "Generic Drugs", desc:'Quality healing at lower prices.'},
    {url: 'Antibiotics.png', name: "Antibiotics", desc:'Strong defense against tough infections.'},
    {url: 'Surgical.png', name:"Surgical Equipment", desc:'Precision tools for medical experts'},
    {url: 'Oncology.png', name:"Oncology Drugs", desc:'Advanced therapy for cancer care.'},
    {url: 'Cardiac.png', name: "Cardiac Care", desc:'Essential support for heart health'},
    {url: 'Emergency.png', name: "Emergency Meds", desc:'Rapid relief for urgent needs.'},
    {url: 'Life-Saving Medicines.png', name:"Life Saving Medicines", desc:'Trusted support for critical care'},
    {url: 'Personal Care.png', name: "Personal Care", desc:'Daily hygiene for better wellness.'},
    {url: 'Pediatric Care.png', name: "Pediatric Care", desc:'Gentle care for your kids'},
    {url: 'Diabetes Care.png', name: "Diabetes Care", desc:'Expert control for sugar levels.'},
    {url: 'Diagnostic.png', name: "Diagnostic Tools", desc:'Fast results for accurate monitoring.'}
]

async function handleOnCategoryBoxClick(cat) {
    await setCategoryTerm(cat)
    navigate('/catalog')
}

  return (
    <>
        <div className={styles.category2}>
            <div className={styles.category2Heading}> Browse by Categories </div>
            <hr></hr>
            <div className={styles.category2Container}>
                {
                    category.map((category, idx) => (
                        <div key={idx} className={styles.category2Box} onClick={ () => 
                            handleOnCategoryBoxClick(category.name)
                        }>
                            <img className={styles.category2Image} src={`/categoryImage/${category.url}`} alt={category.desc}></img>
                            <p className={styles.category2Description}>{category.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
