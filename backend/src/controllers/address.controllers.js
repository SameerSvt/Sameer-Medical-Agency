import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {Address} from '../models/address.model.js'

const addNewAddress = asyncHandler( async (req, res) => {
    const {name, contact, state, city, pincode, areaDetails, landmark} = req.body
    const userId = req.user._id

    if([name, state, city, areaDetails, landmark].some((field) => field?.trim() === "") || isNaN(contact) || isNaN(pincode)) {
        throw new ApiError(400, "All fields are required")
    }

    const address = await Address.create({userId, name, contact, state, city, pincode, areaDetails, landmark})

    if(!address) {
        throw new ApiError(500, "Unable to save address")
    }

    return res.status(201).json(new ApiResponse(201, address, "Address saved successfully"))
})

const getAddress = asyncHandler( async (req, res) => {
    const userId = req.user._id

    const address = await Address.find({userId}).sort({createdAt: -1})

    if(!address) {
         throw new ApiError(500, "Unable to fetch Address")
    }

    return res.status(200).json(new ApiResponse(200, address, "All Addresses fetched sccessfully"))
})


const editAddress = asyncHandler( async (req, res) => {

})
export {addNewAddress, getAddress, editAddress}