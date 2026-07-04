import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {
    addNewAddress,
    getAddress,
    editAddress
} from '../controllers/address.controllers.js'

const router = Router()

router.route('/add-new-address').post(verifyJWT, addNewAddress)
router.route('/get-address').get(verifyJWT, getAddress)
router.route('/edit-address').get(verifyJWT, editAddress)

export default router