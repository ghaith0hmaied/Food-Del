import orderModel from "../Models/orderModel.js";
import userModefrom from "../Models/userModel.js";
import stripe from "stripe"


const  stripe = new stripe(process.env.TPIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder = async (req,res) => {

    const frontend_url = "https://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.prce*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Fee",
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session = await stripe.Checkout.sessions.create({
            line_items: line_items,
            mode:'payment',
            success_url:'${frontend_url}/verify?success=true&orderId=${newOrder_id}',
            cancel_url:'${frontend_url}/verify?success=false&orderId=${newOrder_id}',
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder}