import Post from '../models/post.model.js';

export const newpost = async (req, res)=>{
    try{

        const {title, description, image} = req.body;
        const user = req.user;


        if(!title){
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const newpost = new Post({
            title,
            description,
            image,
            userId: user._id
        });

        newpost.save();
        return res.status(201).json({ success: true, message: `Posted`, post: newpost });

        

    }catch(err){
        console.warn(`Error in post controller NEWPOST :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}

export const getPosts = async (req, res)=>{
    try{
        const posts = await Post.find();
        return res.status(200).json({ success: true, message: "Posts fetched", posts });

    }catch(err){
        console.warn(`Error in post controller GETPOSTS :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}

export const deletePost = async (req, res)=>{
    try{

        const postId = req.params.id;
        const user = req.user;

        const post = await Post.findById(postId);

        if(!post.userId == user._id){
            return res.status(401).json({ success: false, message: "You don't have access to delete this post" })
        }

        const deletePost = await Post.findOneAndDelete({_id: post._id});

        if(!deletePost){
        return res.status(401).json({ success: false, message: "Can't delete post right now"})
        }

        return res.status(200).json({success: false, message: "Post deleted successfully", post: deletePost});
        
    }catch(err){
        console.warn(`Error in post controller GETPOSTS :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}