import React from 'react'
import styles from './Catalog.module.css'
import ProductCard from './ProductCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useProductFilter } from '../../context/ProductFilterContext.jsx'


export default function Catalog({ searchTerm, categoryTerm }) {
  const {handleOnFilterChange, selectedFilters, products} = useProductFilter()

  
  const saltOptions = ["Paracetamol", "Amoxicillin", "Cefixime", "Glimepiride", "Vitamin C", "Atorvastatin", "Pantoprazole", "Ibuprofen", "Metformin", "Diclofenac"];

  const categoryOptions = ["Generic Drugs", "Antibiotics", "Cardiac Care", "Diabetes Care", "Pediatric Care", "Oncology Drugs", "Emergency Meds", "Surgical Equipment", "Personal Care", "Diagnostic Tools"];

  // const brandOptions = ["Pfizer", "Johnson", "Sanofi", "Cipla", "Abbott", "Mankind", "Lupin", "Zydus", "Alkem", "Ipca"];

  const sortOptions = ["Price: Low to High", "Price: High to Low", "Better Discount"]

  return (
    <div>
      <div className={styles.catalogBanner}>
        <img src="myAssets/Catalog.png"></img>
      </div>

      <div className={styles.catalog}>

        <div className={styles.leftSection}>
          <div className={styles.leftSticky}>
            <h1>FILTER & SORT</h1>

            <div className={styles.filterPhone}>

              <select name="salt" value={selectedFilters.salt} onChange={handleOnFilterChange}>
                <option value="">Salt</option>
                {
                  saltOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))
                }
              </select>
              <hr></hr>

              <select name="category" value={selectedFilters.category} onChange={handleOnFilterChange}>
                <option value="">Category</option>
                {
                  categoryOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))
                }
                
              </select>
              <hr></hr>

               <select name="sort" value={selectedFilters.sort} onChange={handleOnFilterChange}>
                <option value="">Sort By: Relevance</option>
                {
                  sortOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))
                }
              </select>
              <hr></hr>

              <div className={styles.spacing}></div>
            </div>

          </div>
        </div>

        <div className={styles.rightSection}>

          {
            products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))
          }

          {
            products.length === 0 && <div className={styles.notFound}><img src="NotFound.png"></img></div>
          }

        </div>
      </div>
    </div>
  )
}

