import Product from "../models/Product.js";

// CREATE
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            image: req.file ? req.file.filename : null,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateProduct = async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
        };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
export const getProducts = async (req, res) => {
    try {
        const list = await Product.find().populate("categoryId", "name");
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const reduceStock = async (req, res) => {
    try {
        const { items } = req.body;

        for (const item of items) {
            await Product.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.qty },
            });
        }

        res.json({ message: "Stock reduced successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getProductCount = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.json({ totalProducts: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


