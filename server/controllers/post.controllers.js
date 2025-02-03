import Post from '../models/post.model.js';

export const newpost = async (req, res)=>{
    try{

        const {title, description, image} = req.body;

        if(!title){
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const newpost = new Post({
            title,
            description,
            image
        });

        newpost.save();
        return res.status(201).json({ success: true, message: `Posted`, post: newpost })

    }catch(err){
        console.warn(`Error in post controller NEWPOST :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}