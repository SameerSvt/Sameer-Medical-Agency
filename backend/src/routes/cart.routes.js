import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    addToCart,
    fetchCart,
    removeItem,
    getBillingDetails
 } from "../controllers/cart.controller.js"


const router = Router()

router.route("/add-to-cart").post(verifyJWT, addToCart)
router.route("/fetch-cart").get(verifyJWT, fetchCart)
router.route("/remove-item").post(verifyJWT, removeItem)
router.route("/billing-details").get(verifyJWT, getBillingDetails)

export default router