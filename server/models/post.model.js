import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
            },
            pic: {
                type: String,
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            },
        }
    ]

}, {timeStamps: true,});


const Post = mongoose.model("Post", PostSchema);

export default Post;