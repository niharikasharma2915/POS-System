import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        image: { type: String }, // ✅ NEW
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
