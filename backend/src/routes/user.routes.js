import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    signUpUser,
    loginUser,
    getCurrentUser,
    logoutUser
} from "../controllers/user.controller.js"



const router = Router()

router.route("/signUp").post(signUpUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router