import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import { errorHandler } from "./middlewares/error.middleware.js"

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)


app.use(errorHandler)

export {app}