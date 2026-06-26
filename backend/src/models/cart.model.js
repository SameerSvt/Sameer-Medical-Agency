import mongoose, { Schema } from "mongoose"

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
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
                required: true,
                default: 1,
                min: 1
            }

        }
    ]
}, {timestamps: true})

export const Cart = mongoose.model("Cart", cartSchema)