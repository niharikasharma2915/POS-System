import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
    {
        bankName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Bank", bankSchema);
