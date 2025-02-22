import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image"],
    },
    tags: [String],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    author :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
},{timestamps:true});

export const Post = mongoose.model("Post", postSchema);