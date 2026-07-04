import mongoose, { Schema } from "mongoose"

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            priceAtPurchase: {
                type: Number,
                required: true
            }
        }
    ],
    billingDetails: {
        subTotal: { type: Number, required: true },
        deliveryCharge: { type: Number, required: true },
        discount: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
    },
    billingAddress: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
        city: { type: String, required: true },
        areaDetails: { type: String, required: true },
        landmark: { type: String, required: true }
    },
    paymentOption: {
        type: String,
        enum: ["Credit/Debit Card", "Net Banking", "UPI", "Cash on Delivery (COD)"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: function () {
            return this.paymentOption === "Cash on Delivery (COD)" ? "Pending" : "Paid"
        }
    },
    orderStatus: {
        type: String,
        enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Order Placed"
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
}, {timestamps: true})

export const Order = mongoose.model("Order", orderSchema)