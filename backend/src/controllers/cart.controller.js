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

const fetchCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId").lean()

    if (!cart) {
        return res.status(200).json(new ApiResponse(200, { items: [] }, "Cart is Empty"))
    }

    return res.status(200).json(new ApiResponse(200, cart, "Cart fetched Successfully"))

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

const getBillingDetails = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId").lean()
    let quantity = 0
    let subtotal = 0
    let discount = 0
    let deliveryCharge = 0
    let totalAmount = 0
    let cartTotal = 0

    if(!cart || !cart.items || cart.items.length === 0 ) {
        return res.status(200).json(new ApiResponse(200, {quantity, subtotal, discount, cartTotal, deliveryCharge, totalAmount}))
    }

    for (let cartItem of cart.items) {
        const item = cartItem.productId

        quantity += cartItem.quantity
        subtotal += cartItem.quantity * item.mrp
        cartTotal += cartItem.quantity * item.retailPrice

    }
    discount = subtotal - cartTotal
    deliveryCharge = (cartTotal > 499 || cartTotal === 0) ? 0 : 49
    totalAmount = subtotal - discount + deliveryCharge


    return res.status(200).json(new ApiResponse(200, {quantity, subtotal, discount, cartTotal, deliveryCharge, totalAmount}, "Billing details calculated successfully"))
})

const updateQuantity = asyncHandler( async(req, res) => {
    const {productId, quantity} = req.body


})

export {
    addToCart,
    fetchCart,
    removeItem,
    getBillingDetails
}