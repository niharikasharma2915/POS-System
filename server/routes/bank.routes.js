import express from "express";
import {
    createBank,
    getBanks,
    updateBank,
    deleteBank,
} from "../controllers/bank.controller.js";

const router = express.Router();

router.post("/", createBank);
router.get("/", getBanks);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);

export default router;
