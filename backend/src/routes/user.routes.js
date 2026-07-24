import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    signUpUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    selectAddress,
    retailerVerification,
    handlePricing
} from "../controllers/user.controller.js"

const router = Router()

router.route("/signUp").post(signUpUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/select-address").patch(verifyJWT, selectAddress)
router.route("/retailer-verification").patch(verifyJWT, retailerVerification)
router.route("/handle-pricing").patch(verifyJWT, handlePricing)

export default router