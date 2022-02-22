import FeedDetail from "../models/feedDetails.js"


export const getAllFeedDetails = async (req, res) => {
    try{
        const response = await FeedDetail.find();
        res.send(response);
    }
    catch(err){
        console.log(err.message);
    }
};

export const addFeedDetail = async (req, res) => {
    try{
        const feedDetails = new FeedDetail(req.body);
        const response = await feedDetails.save();
        res.send(`Feed detail with id ${response._id} added to database`);
    }
    catch(err){
        console.log(err.message);
    }
};

export const removeAllDetails = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await FeedDetail.findByIdAndDelete(req.params.id);
        res.send(`Feed detail with id ${id} has been successfully deleted from the database`);
    }
    catch(err){
        console.log(err.message);
    }
};