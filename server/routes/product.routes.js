import express from "express";
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../utils/upload.js";
import { reduceStock } from "../controllers/product.controller.js";
import { getProductCount } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.post("/reduce-stock", reduceStock);
router.get("/count", getProductCount);

export default router;
