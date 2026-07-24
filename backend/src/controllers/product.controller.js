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
    const { search, salt, category, sort } = req.query

    const isB2BMode = Boolean(req.user && req.user?.isVerifiedRetailer && req.user?.isWholesaleApplied)

    const queryObject = {}

    if (search?.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i')
        queryObject.$or = [
            { name: searchRegex },
            { saltComposition: searchRegex },
            { category: searchRegex }
        ]
    }

    if (salt?.trim()) {
        queryObject.saltComposition = new RegExp(salt.trim(), 'i')
    }

    if (category?.trim()) {
        queryObject.category = category.trim()
    }

    let pipeline = [{ $match: queryObject }]

    const targetPriceField = isB2BMode ? "wholesalePrice" : "retailPrice"

    if (sort?.trim()) {
        const sortOption = {}
        if (sort === "Price: Low to High") {
            sortOption[targetPriceField] = 1
        }
        if (sort === "Price: High to Low") {
            sortOption[targetPriceField] = -1
        }
        if (!isB2BMode) {
            if (sort === "Better Discount") {
                sortOption.discountPercentage = -1
            }
        }

        if (Object.keys(sortOption).length > 0) {
            pipeline.push({ $sort: sortOption })
        }
    } else {
        pipeline.push({ $sample: { size: 100 } })
    }

    if (isB2BMode) {
        pipeline.push(
            {
                $project: {
                    discountPercentage: 0
                }
            },
            {
                $addFields: {
                    retailPrice: "$wholesalePrice"
                }
            }
        )
    } else {
        pipeline.push({
            $project: {
                wholesalePrice: 0
            }
        })
    }

    const products = await Product.aggregate(pipeline)

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