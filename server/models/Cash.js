import mongoose from "mongoose";

const cashSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Cash", cashSchema);
