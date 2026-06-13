import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"
import { Product } from "../models/product.model.js"
import {productsData} from "./productsData.js"

const seedProducts = async () => {
    try {

        console.log("connecting to MongoDB")
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connection successfull")

        // await Product.deleteMany({})

        await Product.insertMany(productsData)

        
    } catch (error) {
        console.error("something went wrong while adding data or connecting to database")
    } finally {
        console.log("Products data added successfully")
        await mongoose.disconnect()

    }
}
seedProducts()