import mongoose from 'mongoose'


export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://ghaith:zNIcEYhrZZup5OSm@cluster.kzvxtj0.mongodb.net/food-del').then(()=>console.log('DB connected'))
}