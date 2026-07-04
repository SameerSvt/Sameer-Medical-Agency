import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true,
        min: [1000000000, "Phone number must be exactly 10 digits"],
        max: [9999999999, "Phone number must be exactly 10 digits"]
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
        min: [100000, "Pincode must be exaclty 6 digits"],
        max: [999999, "Pincode must be exaclty 6 digits"]
    },
    areaDetails: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Address = mongoose.model('Address', addressSchema)