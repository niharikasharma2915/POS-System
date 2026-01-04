import express from "express";
import {
    addCash,
    getCashList,
    deleteCash,
} from "../controllers/cash.controller.js";

const router = express.Router();

router.post("/", addCash);
router.get("/", getCashList);
router.delete("/:id", deleteCash);

export default router;
