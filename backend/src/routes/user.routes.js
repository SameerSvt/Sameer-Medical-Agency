import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    signUpUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    selectAddress,
    retailerVerification,
    handlePricing,
    changePassword,
    editProfile,
    editAvatar
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/signUp").post(signUpUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/select-address").patch(verifyJWT, selectAddress)
router.route("/retailer-verification").patch(verifyJWT, retailerVerification)
router.route("/handle-pricing").patch(verifyJWT, handlePricing)
router.route("/edit-profile").patch(verifyJWT, editProfile)
router.route("/change-password").put(verifyJWT, changePassword)
router.route("/edit-avatar").put(verifyJWT, upload.single("avatar"), editAvatar)

export default router