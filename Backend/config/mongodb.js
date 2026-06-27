import mongoose from "mongoose";
const connectdb=async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('db connected')
    })
   await mongoose.connect(`${process.env.MONGODB_URI}/fyp`)
//    await mongoose.connect(`${process.env.LOCAL_MONGO_URI}/fyp`)
}
export default connectdb

