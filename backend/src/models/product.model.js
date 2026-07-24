import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image : {
        type: String, //Cloudinary url
        required: true
    },
    saltComposition: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Generic Drugs", "Surgical Equipment", "Oncology Drugs", "Cardiac Care", "Emergency Meds", "Personal Care", "Pediatric Care", "Diabetes Care", "Diagnostic Tools", "Life Saving Medicines", "Antibiotics"
        ]
    },
    mrp: {
        type: Number,
        required: true,
        min: [0, "MRP cannot be negative"]
    },
    retailPrice: {
        type: Number,
        required: true,
        min: [0, "Retail price cannot be negative"]
    },
    wholesalePrice: {
        type: Number,
        required: true,
        min: [0, "Wholesale price cannot be negative"]
    },
    discountPercentage: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Discount cannot be less than 0%"],
        max: [100, "Discount cannot exceed 100%"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Stock cannot be negative"]
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)