import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductFilterContext = createContext(null)

export default function ProductFilterProvider({ children }) {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const clearFilter = {
        salt: "",
        category: "",
        sort: ""
    }

    const [selectedFilters, setSelectedFilters] = useState(clearFilter)

    function handleOnFilterChange(e) {
        const { name, value } = e.target
        setSelectedFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/v1/products/get-all-products", {
                params: {
                    search: searchTerm,
                    salt: selectedFilters.salt,
                    category: selectedFilters.category,
                    sort: selectedFilters.sort
                }
            })
            console.log(searchTerm)
            if (!response?.data?.data) {
                console.log("Product not found")
                setProducts([])
            }
            setProducts(response.data?.data)
        } catch (error) {
            console.error(error?.response?.data?.message  || "Unable to fetch product from backend " )
            setProducts([])
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [selectedFilters, searchTerm])

    return (
        <ProductFilterContext.Provider value={{ products, selectedFilters, clearFilter, setSelectedFilters, setSearchTerm, handleOnFilterChange }}>
            {children}
        </ProductFilterContext.Provider>
    )
}

export const useProductFilter = () => useContext(ProductFilterContext)