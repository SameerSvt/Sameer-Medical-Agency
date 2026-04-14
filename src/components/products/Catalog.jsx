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
            {/* code to be written */}
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
