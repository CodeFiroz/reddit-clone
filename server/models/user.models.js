import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    pic: {
        type: String,
        default: ""
    },
    resetToken: {
        type: String
    },
    resetTokenExpires: {
        type: Date
    },
}, {timestamps: true}
);

const User = mongoose.model('User', UserSchema);

export default User;