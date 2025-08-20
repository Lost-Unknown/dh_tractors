import mongoose from "mongoose";

let isConnectd = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true)

    if(isConnectd){
        console.log('Mongo DB is already connected')
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "tractors",
        })
        isConnectd = true;
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log(error);
    }
}