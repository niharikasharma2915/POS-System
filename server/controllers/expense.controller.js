import Expense from "../models/Expense.js";

// CREATE expense
export const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ all expenses
export const getExpenses = async (req, res) => {
    try {
        const list = await Expense.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE expense
export const updateExpense = async (req, res) => {
    try {
        const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE expense
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
