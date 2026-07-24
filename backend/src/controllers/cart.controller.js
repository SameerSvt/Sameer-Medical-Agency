import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Cart } from "../models/cart.model.js"

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body
    const userId = req.user._id

    if (!productId) {
        throw new ApiError(400, "Product id is required")
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity }]
        })
    } else {
        const itemIndex = cart.items.findIndex((item) =>
            item.productId.toString() === productId.toString()
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity)
        } else {
            cart.items.push({ productId, quantity })
        }

        await cart.save()
    }

    const populatedCart = await Cart.findById(cart._id).populate("items.productId")

    return res.status(200).json(new ApiResponse(200, populatedCart, "Item added to Cart"))

})

const fetchCart = asyncHandler( async(req, res) => {
    const isB2BMode = Boolean(req.user?.isVerifiedRetailer && req.user?.isWholesaleApplied)

    //For calculating billing details
    let quantity = 0
    let subtotal = 0
    let discount = 0
    let deliveryCharge = 0
    let totalAmount = 0
    let cartTotal = 0

    let responseData = {
        cartItems: [],
        billingDetails: {quantity, subtotal, discount, cartTotal, deliveryCharge, totalAmount}
    }

    const cart = await Cart.findOne({userId: req.user._id}).populate("items.productId")

    if(!cart || cart.items.length === 0) {
        return res.status(200).json(new ApiResponse(200, responseData, "Cart is Empty"))
    }

    const cartObj = cart.toObject()

    const Items = cartObj.items.map((item) => {
        const product = {...item.productId}

        const activePrice = isB2BMode ? product.wholesalePrice : product.retailPrice

        delete product.retailPrice
        delete product.wholesalePrice
        product.sellingPrice = activePrice

        quantity += item.quantity
        subtotal += product.mrp * item.quantity
        cartTotal += product.sellingPrice * item.quantity

        return {
            ...item,
            productId: product
        }
    })

    discount = subtotal - cartTotal
    deliveryCharge = cartTotal <= 499 ? 49 : 0
    totalAmount = subtotal - discount + deliveryCharge

    responseData = {
        cartItems: Items,
        billingDetails: {quantity, subtotal, discount, cartTotal, deliveryCharge, totalAmount}
    }

    return res.status(200).json(new ApiResponse(200, responseData, "Cart fetched successfully"))
})

const removeItem = asyncHandler(async (req, res) => {
    const { productId } = req.body
    const userId = req.user._id

    if (!productId) {
        throw new ApiError(400, "Product ID is required")
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { userId },
        {
            $pull: {
                items: { productId }
            }
        },
        { returnDocument: "after" }
    ).populate("items.productId")

    return res.status(200).json(new ApiResponse(200, updatedCart, "Item removed from Cart"))
})


export {
    addToCart,
    fetchCart,
    removeItem
}