import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import genrateToken from "../utils/genrateToken.js";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../utils/SendMail.js";

export const signup = async (req, res) => {

    try {

        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required. Invalid data" })
        }

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({ success: false, message: `${email} is already registred` })
        }

        const isUsernameExist = await User.findOne({ username });

        if (isUsernameExist) {
            return res.status(400).json({ success: false, message: `${username} is already taken` })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            username,
            password: hashPassword
        });

        await newUser.save();

        genrateToken(newUser._id, res);

        return res.status(201).json({ success: true, message: `Successfully registred`, user: newUser })

    } catch (err) {
        console.warn(`Error in auth controller SIGNUP :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }

}

export const signin = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });

        if (!user) {
            return res.status(400).json({ success: false, message: `${username} is not registred` });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({ success: false, message: `Incorrect password` });
        }

        genrateToken(user._id, res);

        return res.status(200).json({ success: true, message: `successfully sign in` });


    } catch (err) {
        console.warn(`Error in auth controller SIGNIN :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}

export const sendPasswordResetMail = async (req, res) => {
    try {

        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });

        if (!user) {
            return res.status(400).json({ success: false, message: `${username} is not registred` });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        sendResetEmail(resetToken, user.email);

        return res.status(200).json({ success: true, message: "Password reset email is send to registred email address", token: resetToken })


    } catch (err) {
        console.warn(`Error in auth controller SEND PASSWORD RESET MAIL :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }

}

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ success: false, message: `invalid or expired token` });
        }

        const user = await User.findOne({ _id: decoded.id, resetToken: token });

        if (!user) {
            return res.status(400).json({ success: false, message: `invalid or expired token` });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;

        await user.save();

        return res.status(200).json({ success: true, message: "Password update successfully" })


    } catch (err) {
        console.warn(`Error in auth controller RESET PASSWORD :: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error ❌", error: err })
    }
}