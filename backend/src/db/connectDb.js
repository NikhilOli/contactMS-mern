import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DBURL, {dbName: "contactMS"})
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.log("Error connecting db", error);
    }
}