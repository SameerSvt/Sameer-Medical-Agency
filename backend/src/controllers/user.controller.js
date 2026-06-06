import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { validateEmail } from "../utils/validateEmail.js";


const signUpUser = asyncHandler( async (req, res) => {

    //getting data
    const {fullName, email, phone, password} = req.body

    //validation
    if([fullName, email, phone, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    validateEmail(email)
    const phoneStr = String(phone).trim()
    if(phoneStr.length !== 10) {
        throw new ApiError(400, "Phone number must be of 10 digits")
    }

    const existedUser = await User.findOne({
        $or: [{email}, {phone}]
    })

    if(existedUser) {
        throw new ApiError(400, "User already exists try another email or phone")
    }

    const user = await User.create({fullName, email, phone, password})

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User sign up SUCCESS"))
})

const loginUser = asyncHandler( async(req, res) => {
    const {credential, password} = req.body

    const loginCredential = credential?.trim()
    const passwordStr = password?.trim()
    
    if(!loginCredential || !passwordStr) {
        console.log("Email/Phone and Password is required");
        
        throw new ApiError(400, "Email/Phone and Password is required")
    }

    const user = await User.findOne({
        $or: [
            { email: loginCredential},
            {phone: loginCredential}
        ]
    })

    if(!user) {
        console.log("User with Email/Phone doesn't exists");
        throw new ApiError(400, "User with Email/Phone doesn't exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(passwordStr)

    if ( isPasswordValid ) {
        console.log("Login Successful")
        const loggedinUser = await User.findById(user._id).select("-password -refreshToken")
        return res.status(200).json(new ApiResponse(200, loggedinUser, "Login Successfull from backend"))
    } else {
        console.log("Incorrect Password");
        throw new ApiError(400, "Incorrect Password from backend")
    }
})

export {
    signUpUser,
    loginUser
}