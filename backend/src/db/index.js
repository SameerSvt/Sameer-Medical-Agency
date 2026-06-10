import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const d = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${d.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection FAILED", error)
    }
}

export default connectDB