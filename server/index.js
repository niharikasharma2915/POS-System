import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import productRoutes from "./routes/product.routes.js";
import cashRoutes from "./routes/cash.routes.js";
import reportRoutes from "./routes/report.routes.js";
import path from "path";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cash", cashRoutes);
app.use("/api/report", reportRoutes);
app.use("/uploads", express.static(path.join("uploads")));


app.get("/", (req, res) => {
    res.send("Backend running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
