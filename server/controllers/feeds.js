import Feeds from "../models/feeds.js";

export const getAllDetails = async (req, res) => {
    try{
        const response = await Feeds.find();
        if(!response.length) res.send("Nothing to display");
        else res.send(response);
    }
    catch(err){
        console.log(err.message);
    }
}

export const addDetail = async (req, res) => {
    try{
        const feed = new Feeds(req.body);
        const response = await feed.save();
        res.send(`Feed with id ${response._id} added to database`);
    }
    catch(err){
        console.log(err.message);
    }

}


