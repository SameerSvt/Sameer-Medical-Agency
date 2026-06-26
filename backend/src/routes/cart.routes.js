import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    addToCart,
    fetchCart,
    removeItem
 } from "../controllers/cart.controller.js"


const router = Router()

router.route("/add-to-cart").post(verifyJWT, addToCart)
router.route("/fetch-cart").get(verifyJWT, fetchCart)
router.route("/remove-item").post(verifyJWT, removeItem)

export default router