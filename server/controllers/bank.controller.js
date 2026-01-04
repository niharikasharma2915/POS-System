import Bank from "../models/Bank.js";

// CREATE
export const createBank = async (req, res) => {
    try {
        const bank = await Bank.create(req.body);
        res.status(201).json(bank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
export const getBanks = async (req, res) => {
    try {
        const list = await Bank.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateBank = async (req, res) => {
    try {
        const updated = await Bank.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteBank = async (req, res) => {
    try {
        await Bank.findByIdAndDelete(req.params.id);
        res.json({ message: "Bank deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
