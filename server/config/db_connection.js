import mongoose from "mongoose";

const connectDB = ()=>{
    try{

        const connection = mongoose.connect(process.env.MONGODB_URI);

        if(connection){
            console.log(`MONGO_DB Connected ✅`);
        }

    }catch(err){
        console.warn(`Database connection error ❌ :: ${err}`);
    }
}

export default connectDB;