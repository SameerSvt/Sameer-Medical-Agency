import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Order } from "../models/order.model.js"
import { Cart } from "../models/cart.model.js"

const checkout = asyncHandler(async (req, res) => {
    const { items, billingDetails, paymentOption  } = req.body
    const userId = req.user._id

    if (!items || items.length === 0 || !billingDetails || !paymentOption) {
        throw new ApiError(400, "Incomplete checkout parameters")
    }

    const order = await Order.create({
        userId,
        items,
        billingDetails,
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

const getOrderHistory = asyncHandler( async(req, res) => {
    const orderHistory = await Order.find({userId: req.user._id}).populate("items.productId").sort({createdAt: -1})

    return res.status(200).json(new ApiResponse(200, orderHistory, "Order history fetched successfully"))
})

export { checkout,
    getOrderHistory
 }