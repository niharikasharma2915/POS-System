import Cash from "../models/Cash.js";

// CREATE
export const addCash = async (req, res) => {
    try {
        const cash = await Cash.create(req.body);
        res.status(201).json(cash);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
export const getCashList = async (req, res) => {
    try {
        const list = await Cash.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteCash = async (req, res) => {
    try {
        await Cash.findByIdAndDelete(req.params.id);
        res.json({ message: "Cash entry deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
