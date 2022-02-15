import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/feeds.js";

const app = express();
dotenv.config();


const connectFunction = async () => {
    try{
        const PORT = process.env.PORT || 3000, connectionString = process.env.CONNECTION_URI;
        await mongoose.connect(connectionString);
        console.log("Connected with database");
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });   
    }
    catch(err){
        console.log(err.message);
    }   
};


connectFunction();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/", router);







