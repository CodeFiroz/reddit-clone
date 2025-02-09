import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const protectRoute = async(req, res, next) => {

    try{

        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ success: false, message: "Unauthorized - Invaild Token"})
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }


        const user = await User.findById(decoded.userid).select("-password");

        if(!user){
            return res.status(401).json({ success: false, message: "User not found"})
        }


        req.user = user;

        next();

    }catch(err){
        console.warn(`Error in auth middleware :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }

}