// connect database here
import mongoose from "mongoose";
import dotenv from "dotenv"
import app from "./app";

dotenv.config();
const port = 8004;
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI as string)
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is runnig on ${port}`)
    });
})
.catch((error: Error)=>{
    console.log("MongoDB connection error." + error);
    process.exit(1);
})
