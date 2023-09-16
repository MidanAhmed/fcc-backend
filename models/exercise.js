import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    }
);

export const Exercise = mongoose.model('Exercise', exerciseSchema);