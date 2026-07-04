import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Order } from "../models/order.model.js"
import { Cart } from "../models/cart.model.js"
import { User } from "../models/user.model.js"


const checkout = asyncHandler(async (req, res) => {
    const { paymentOption } = req.body
    const userId = req.user._id

    if (!paymentOption) {
        throw new ApiError(400, "Choose payment option")
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId")

    if (!cart || !cart.items || cart.items.length === 0) {
        throw new ApiError(400, "Add product in cart to place order")
    }

    const userProfile = await User.findById(userId).populate("activeAddressId")
    
    if(!userProfile?.activeAddressId) {
        throw new ApiError(400, "Address is required")
    }
    const activeAddress = userProfile.activeAddressId

    let subTotal = 0
    let cartTotal = 0

    const items = cart.items.map((item) => {

        subTotal += item.quantity * item.productId.mrp
        cartTotal += item.quantity * item.productId.retailPrice

        return {
            productId: item.productId._id,
            quantity: item.quantity,
            priceAtPurchase: item.productId.retailPrice
        }
    })

    const deliveryCharge = (cartTotal > 499 || cartTotal === 0) ? 0 : 49
    const discount = subTotal - cartTotal
    const totalAmount = cartTotal + deliveryCharge

    let billingDetails = {
        subTotal,
        deliveryCharge,
        discount,
        totalAmount
    }

    let billingAddress = {
        name: activeAddress.name,
        contact: activeAddress.contact,
        state: activeAddress.state,
        pincode: activeAddress.pincode,
        city: activeAddress.city,
        areaDetails: activeAddress.areaDetails,
        landmark: activeAddress.landmark
    }

    const order = await Order.create({
        userId,
        items,
        billingDetails,
        billingAddress,
        paymentOption
    })

    if (!order) {
        throw new ApiError(500, "Unable to place your Order... Try again")
    }

    await Cart.findOneAndUpdate(
        { userId },
        {
            $set: {
                items: []
            }
        },
        { returnDocument: "after" }
    )

    const populatedOrder = await order.populate("items.productId")

    return res.status(201).json(
        new ApiResponse(201, populatedOrder, "Order Placed Successfully"
        )
    )
})

const getOrderHistory = asyncHandler(async (req, res) => {
    const orderHistory = await Order.find({ userId: req.user._id }).populate("items.productId").sort({ createdAt: -1 })

    return res.status(200).json(new ApiResponse(200, orderHistory, "Order history fetched successfully"))
})

export {
    checkout,
    getOrderHistory
}