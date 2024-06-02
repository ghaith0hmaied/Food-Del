import express from"express";
import cors from "cors";
import { connect } from "mongoose";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import "dotenv/config"


//app config

const app = express();
const port = 4000


//middleware

app.use(express.json())
app.use(cors())

//DB connection
connectDB();


//api endpoint

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})


//

//zNIcEYhrZZup5OSm   ghaith