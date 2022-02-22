import mongoose from "mongoose";

const feedDetailSchema = new mongoose.Schema({
    feedDate: {
        type: String, 
        default: ""
    }, 
    feedTitle: {
        type: String, 
        default: ""
    }, 
    feedAuthor: {
        type: String, 
        default: ""
    }, 
    feedDescription: {
        type: String, 
        default: ""
    }, 
    feedUrl: {
        type: String, 
        default: ""
    }
});

export default mongoose.model("detail", feedDetailSchema);