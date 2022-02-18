import Feeds from "../models/feeds.js";
import mongoose from "mongoose";

export const getAllFeeds = async (req, res) => {
    try{
        const response = await Feeds.find();
        // if(!response.length) res.send("No feed present");
        res.send(response);
    }
    catch(err){
        console.log(err.message);
    }
}

export const addFeed = async (req, res) => {
    try{
        const feed = new Feeds(req.body);
        const response = await feed.save();
        res.send(`Feed with id ${response._id} added to database`);
    }
    catch(err){
        console.log(err.message);
    }

}

export const getFeed = async (req, res) => {
    try{
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const response = await Feeds.findById(id);
            if(!response) res.send(`No such feed with id ${id} exists in the database`);
            else res.send(response);
        }
        else res.status(400).send("Invalid ObjectId");
    }
    catch(err){
        console.log(err.message);
    }
};

export const updateFeed = async (req, res) => {
    try{
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const response = await Feeds.findByIdAndUpdate(id, req.body, {new:true});
            if(!response) res.send(`No such feed with id ${id} exists in the database`);
            else res.send(`Feed with id ${id} updated in the database`);
        }
        else res.status(400).send("Invalid ObjectId");
    }
    catch(err){
        console.log(err.message);
    }
};

export const deleteFeed = async (req, res) => {
    try{
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const response = await Feeds.findByIdAndDelete(id);
            if(!response) res.send(`No such feed with id ${id} exists in the database`);
            else res.send(`Feed with id ${id} deleted from the database`);
        }
        else res.status(400).send("Invalid ObjectId"); 
    }
    catch(err){
        console.log(err.message);
    }
};


