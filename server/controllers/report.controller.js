import Cash from "../models/Cash.js";
import Expense from "../models/Expense.js";

export const getReportSummary = async (req, res) => {
    try {
        const cashInAgg = await Cash.aggregate([
            { $match: { type: "IN" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const cashOutAgg = await Cash.aggregate([
            { $match: { type: "OUT" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const expenseAgg = await Expense.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        res.json({
            cashIn: cashInAgg[0]?.total || 0,
            cashOut: cashOutAgg[0]?.total || 0,
            expenses: expenseAgg[0]?.total || 0,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
