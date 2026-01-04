import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Cash", "Bank"],
            default: "Cash",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
