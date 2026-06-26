import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    checkout,
    getOrderHistory
} from "../controllers/order.controller.js"

const router = Router()

router.route('/checkout').post(verifyJWT, checkout)
router.route('/get-order-history').get(verifyJWT, getOrderHistory)

export default router