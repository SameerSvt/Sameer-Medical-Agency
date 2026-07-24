import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT, AuthProductFetching} from "../middlewares/auth.middleware.js"
import { 
    listProduct,
    getAllProducts
 } from "../controllers/product.controller.js"


const router = Router()

router.route("/list-product").post(verifyJWT, upload.single("image"), listProduct)
router.route("/get-all-products").get(AuthProductFetching, getAllProducts)

export default router