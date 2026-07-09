import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";

const listProduct = asyncHandler(async (req, res) => {

    const {
        name, saltComposition, category, mrp, retailPrice, wholesalePrice, discountPercentage, stock
    } = req.body

    const missingStringField = [name, saltComposition, category].some((field) => field?.trim() === "")
    const missingNumericField = [mrp, retailPrice, wholesalePrice, discountPercentage, stock].some((field) => field === undefined || field === null || field === "")

    if (missingNumericField || missingStringField) {
        throw new ApiError(400, "All fields are required")
    }

    const existedProdict = await Product.findOne({ name: name.toLowerCase().trim() })

    if (existedProdict) {
        throw new ApiError(400, "Product with this name already exists")
    }

    const imageLocalPath = req.file?.path

    if (!imageLocalPath) {
        throw new ApiError(400, "Image file not uploaded")
    }

    const uploadedImage = await uploadOnCloudinary(imageLocalPath)

    if (!uploadedImage?.secure_url) {
        throw new ApiError(500, "Failed to upload product image to the cloud")
    }

    const product = await Product.create({
        name: name.toLowerCase().trim(),
        saltComposition: saltComposition.toLowerCase().trim(),
        category,
        mrp: Number(mrp),
        retailPrice: Number(retailPrice),
        wholesalePrice: Number(wholesalePrice),
        discountPercentage: Number(discountPercentage) || 0,
        stock: Number(stock) || 0,
        image: uploadedImage.secure_url // Save the Cloudinary HTTPS path link
    })

    if (!product) {
        throw new ApiError(500, "Something went wrong while creating the product record.");
    }

    return res.status(201).json(new ApiResponse(
        201,
        product,
        "Product created and uploaded on database successfully"
    ))
})

const getAllProducts = asyncHandler(async (req, res) => {
    const { search, salt, category, brand, sort } = req.query

    const queryObject = {}

    if(search.trim() !== "") {
        queryObject.$or = [
            {name: {$regex: search.trim(), $options: 'i'}},
            {saltComposition: {$regex: search.trim(), $options: 'i'}},
            {category: {$regex: search.trim(), $options: 'i'}}
        ] 
    }

    if (salt) {
        queryObject.saltComposition = { $regex: salt, $options: 'i' }
    }

    if (category) {
        queryObject.category = category
    }

    let products
    
    if(!sort) {
        // const countMatch = await Product.countDocuments(queryObject)

        products = await Product.aggregate([
            {$match: queryObject},
            // {$sample: {size: countMatch || 1}}
            {$sample: {size: 100}}
        ])
    }
    else {
        let queryProducts = Product.find(queryObject).lean()

        if (sort === "Price: Low to High") {
            queryProducts = queryProducts.sort({ retailPrice: 1 })
        }
        if (sort === "Price: High to Low") {
            queryProducts = queryProducts.sort({ retailPrice: -1 })
        }
        if (sort === "Better Discount") {
            queryProducts = queryProducts.sort({ discountPercentage: -1 })
        }

        products = await queryProducts
    }



    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched from database"
        )
    )

})

export {
    listProduct,
    getAllProducts
}