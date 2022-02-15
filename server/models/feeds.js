import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    feedUrl: {
        type: String,
        default: "",
        required: true
    }
}, {timestamps: true});

export default mongoose.model("feed", feedSchema);