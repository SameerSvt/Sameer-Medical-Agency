import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [address, setAddress] = useState({})
    const [billingDetails, setBillingDetails] = useState({})

    async function fetchAddress() {
        try {
            const getUser = await axios.get("/api/v1/users/current-user?populate=address")
            if (getUser) {
                setAddress(getUser.data?.data?.activeAddressId)
            }
        } catch (error) {
            console.log("Error occure while fetching address", error)
        }
    }

    async function fetchCartData() {
        try {
            const response = await axios.get("/api/v1/carts/fetch-cart")
            if (response) {
                setCartItems(response?.data?.data?.items)
            }

            const billingResponse = await axios.get("/api/v1/carts/billing-details")
            if (billingResponse) {
                setBillingDetails(billingResponse.data?.data)
            }
        } catch (error) {
            console.log("Error occure while fetching cart data", error)
        }
    }

    useEffect(() => {
        async function fetchCart() {
            try {
                await fetchCartData()
                await fetchAddress()
            } catch (error) {
                console.log("Error occure while fetching cart", error)
            }
        }
        fetchCart()
    }, [])

    async function removeItem(productId) {
        try {
            const response = await axios.post("/api/v1/carts/remove-item", { productId })
            alert(`${productId.name} removed from cart`)
            await fetchCartData()
        } catch (error) {
            console.error("Error occured while removing item from cart")
        }
    }

    async function addToCart(productId, quantity) {
        try {
            const response = await axios.post("/api/v1/carts/add-to-cart", { productId, quantity })
            alert("Item added to cart successfully")
            await fetchCartData()
        } catch (error) {
            alert(error.response.data?.message)
        }
    }

    async function updateQuantity(productId, quantity) {
        try {
            const response = await axios.post("/api/v1/carts/add-to-cart", { productId, quantity })
            await fetchCartData()
        } catch (error) {
            console.log("Something went wrong while adding item to cart", error)
        }
    }


    return (
        <CartContext.Provider value={{ cartItems, address, billingDetails, fetchCartData, fetchAddress, removeItem, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

