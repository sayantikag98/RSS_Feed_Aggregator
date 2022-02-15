import mongoose from "mongoose";

const feedSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("feed", feedSchema);