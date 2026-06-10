import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
    
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



const signUpUser = asyncHandler( async (req, res) => {

    //getting data
    const {fullName, email, phone, password} = req.body

    //validation
    if([fullName, email, phone, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
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

    if(!isPasswordValid) {
        throw new ApiError(400, "Incorrect Password")
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    //const loggedinUser = await User.findById(user._id).select("-password -refreshToken")
    const loggedinUser = user.toObject()
    delete loggedinUser.password
    delete loggedinUser.refreshToken

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log("Login Successfull")
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedinUser,
                accessToken,
                refreshToken
            },
            "Login Successfull"
    ))

})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const logoutUser = asyncHandler( async (req, res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(
        200, {}, "User logged out"
    ))
})


export {
    signUpUser,
    loginUser,
    getCurrentUser,
    logoutUser
}