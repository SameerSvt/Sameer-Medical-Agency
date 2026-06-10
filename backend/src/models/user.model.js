import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["customer", "retailer", "admin"],
        default: "customer"
    },
    isVerifiedRetailer: { type: Boolean, default: false },
    businessDetails: {
        firmName: { type: String, trim: true },
        drugLicenseNumber: { type: String, trim: true },
        gstNumber: { type: String, trim: true }
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String, default: "India" }
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 10) 
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign (
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign (
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)

