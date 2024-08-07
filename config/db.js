import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb ${mongoose.connection.host}`.bgMagenta.white)
    }catch(error){
        console.log(`Mongo db error ${error}`.bgRed.white)    }
    
};

export default connectDB;
