import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        }
    }
);

export const User = mongoose.model('User', userSchema);