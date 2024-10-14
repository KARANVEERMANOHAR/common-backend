import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", userSchema);
export default User;
