import React from 'react'
import styles from './Catalog.module.css'
import ProductCard from './ProductCard'
import { Products } from './Products'

export default function Catalog({searchTerm, categoryTerm}) {
  
  const filteredProducts = Products.filter((item) => {
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.salt?.toLowerCase().includes(searchTerm.toLowerCase())
    
      const matchesCategory = categoryTerm === "All" || item.category === categoryTerm

    return matchesSearch && matchesCategory
    })

  return (
    <div>
      <div className={styles.catalogBanner}>
        <img src="src/assets/Catalog.png"></img>
      </div>

      <div className={styles.catalog}>

        <div className={styles.leftSection}>
          <div className={styles.leftSticky}>
            <h1>FILTER & SORT</h1>

            <select name="salt">
              <option value="">Salt</option>
              <option value="Paracetamol">Paracetamol</option>
              <option value="Amoxicillin">Amoxicillin</option>
              <option value="Cefixime">Cefixime</option>
              <option value="Glimepiride">Glimepiride</option>
              <option value="Vitamin C">Vitamin C</option>
              <option value="Atorvastatin">Atorvastatin</option>
              <option value="Pantoprazole">Pantoprazole</option>
              <option value="Ibuprofen">Ibuprofen</option>
              <option value="Metformin">Metformin</option>
              <option value="Diclofenac">Diclofenac</option>
            </select>
            <hr></hr>

            <select name="salt">
              <option value="">Category</option>
              <option value="Generic Drugs">Generic Drugs</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Cardiac Care">Cardiac Care</option>
              <option value="Diabetes Care">Diabetes Care</option>
              <option value="Pediatric Care">Pediatric Care</option>
              <option value="Oncology Drugs">Oncology Drugs</option>
              <option value="Emergency Meds">Emergency Meds</option>
              <option value="Surgical Equipment">Surgical Equipment</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Disgnostic Tools">Diagnostic Tools</option>
              </select>
            <hr></hr>

            <select name="salt">
              <option value="">Brands</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Johnson">Johnson</option>
              <option value="Sanofi">Sanofi</option>
              <option value="Cipla">Cipla</option>
              <option value="Dr. Reddy's Laboratories">Abbott</option>
              <option value="Mankind Pharma">Mankind</option>
              <option value="Lupin Ltd">Lupin</option>
              <option value="Zydus Lifesciences">Zydus</option>
              <option value="Alkem Laboratories">Alkem</option>
              <option value="Torrent Pharmaceuticals">Ipca</option>
              </select>
            <hr></hr>
            <div></div>
            
            
            
           
          </div>
        </div>

        <div className={styles.rightSection}>

        {
          filteredProducts.map((item) => (
            <ProductCard product={item} key={item.id}/>
          ))
        }

        {
          filteredProducts.length === 0 && <h1>No products found</h1>
        }

        </div>
      </div>
    </div>
  )
}
