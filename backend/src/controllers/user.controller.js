import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const signUpUser = asyncHandler(async (req, res) => {

    const { fullName, email, phone, password } = req.body

    if ([fullName, email, phone, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    const phoneStr = String(phone).trim()
    if (phoneStr.length !== 10) {
        throw new ApiError(400, "Phone number must be of 10 digits")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { phone }]
    })

    if (existedUser) {
        throw new ApiError(400, "User already exists try another email or phone")
    }

    const user = await User.create({ fullName, email, phone, password })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User sign up SUCCESS"))
})


const loginUser = asyncHandler(async (req, res) => {
    const { credential, password } = req.body

    const loginCredential = credential?.trim()
    const passwordStr = password?.trim()

    if (!loginCredential || !passwordStr) {
        console.log("Email/Phone and Password is required");

        throw new ApiError(400, "Email/Phone and Password is required")
    }

    const user = await User.findOne({
        $or: [
            { email: loginCredential },
            { phone: loginCredential }
        ]
    })

    if (!user) {
        console.log("User with Email/Phone doesn't exists");
        throw new ApiError(400, "User with Email/Phone doesn't exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(passwordStr)

    if (!isPasswordValid) {
        throw new ApiError(400, "Incorrect Password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    //const loggedinUser = await User.findById(user._id).select("-password -refreshToken")
    const loggedinUser = user.toObject()
    delete loggedinUser.password
    delete loggedinUser.refreshToken

    const options = {
        httpOnly: true,
        secure: false
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

const getCurrentUser = asyncHandler(async (req, res) => {

    let user = req.user

    if (req.query.populate === "address") {
        user = await req.user.populate("activeAddressId")
    }

    if (!user) {
        throw new ApiError(400, "Unable to get Address")
    }

    return res.status(200).json(new ApiResponse(200, user, "User fetched Successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { returnDocument: "after" }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(
            200, {}, "User logged out"
        ))
})

const selectAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.body

    if (!addressId) {
        throw new ApiError(400, "Address Id is required")
    }

    const updatedAddress = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                activeAddressId: addressId
            }
        },
        { returnDocument: "after" }
    ).populate("activeAddressId")

    if (!updatedAddress) {
        throw new ApiError(500, "Unable to select address")
    }

    res.status(200).json(new ApiResponse(200, updatedAddress.activeAddressId, "Address Selected"))
})

const retailerVerification = asyncHandler(async (req, res) => {
    const { firmName, drugLicenseNumber, gstNumber } = req.body

    if ([firmName, drugLicenseNumber, gstNumber].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const verification = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                businessDetails: {
                    firmName,
                    drugLicenseNumber,
                    gstNumber
                },
                isVerifiedRetailer: true
            }
        },
        { returnDocument: "after" }
    ).select("-password -refreshToken")

    if (!verification) {
        throw new ApiError(500, "Unable to verify business details")
    }

    return res.status(200).json(new ApiResponse(200, verification, "Congratulations! You are a verfied retailer now."
    ))
})

const handlePricing = asyncHandler(async (req, res) => {
    const { togglePrice } = req.body

    if (typeof togglePrice !== "boolean" || !req.user.isVerifiedRetailer) {
        throw new ApiError(400, "Invalid request.")
    }

    const updatedPricing = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                isWholesaleApplied: togglePrice
            }
        },
        { returnDocument: "after" }
    )

    if (!updatedPricing) {
        throw new ApiError(500, "Unable to change pricing")
    }

    return res.status(200).json(new ApiResponse(200, { isWholesaleApplied: updatedPricing.isWholesaleApplied }, "Pricing Changed Successfully"))
})

const editProfile = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if ([fullName, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Name & Email required")
    }

    if (email !== req.user?.email) {
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            throw new ApiError(400, "User with this email already exists")
        }
    }

    const updatedProfile = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        { returnDocument: "after" }
    )

    if (!updatedProfile) {
        throw new ApiError(500, "Something went wrong, Unable to change profile")
    }

    return res.status(200).json(new ApiResponse(200, updatedProfile, "Your profile is updated"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    // 1. Check for missing/empty fields
    if ([oldPassword, newPassword, confirmPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. Check if new password matches confirmation
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    // 3. Prevent re-using the current password
    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password");
    }

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)


    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    const updatedUser = user.toObject()
    delete updatedUser.password
    delete updatedUser.refreshToken

    return res.status(200).json(new ApiResponse(200, updatedUser, "Password changed successfully"
    ))
})

const editAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Image file not uploaded")
    }

    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath)

    if (!uploadedAvatar?.url) {
        throw new ApiError(500, "Unable to upload Image on Cloudinary")
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: uploadedAvatar.url
            }
        },
        {returnDocument: "after"}
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(500, "Failed to update avatar in database");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "Avatar changed successfully"
        )
    )
})

export {
    signUpUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    selectAddress,
    retailerVerification,
    handlePricing,
    editProfile,
    changePassword,
    editAvatar
}