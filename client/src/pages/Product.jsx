import { useEffect, useState } from "react";
import CommonModal from "../components/CommonModal";

const PRODUCT_API = "http://localhost:5000/api/product";
const CATEGORY_API = "http://localhost:5000/api/category";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        status: true,
        image: null
    });

    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch(PRODUCT_API);
        const data = await res.json();
        setProducts(data);
    };

    const fetchCategories = async () => {
        const res = await fetch(CATEGORY_API);
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("categoryId", form.categoryId);
        formData.append("price", form.price);
        formData.append("stock", form.stock);
        formData.append("status", form.status);

        if (form.image) {
            formData.append("image", form.image);
        }

        const url = editId
            ? `${PRODUCT_API}/${editId}`
            : PRODUCT_API;

        const method = editId ? "PUT" : "POST";

        await fetch(url, {
            method,
            body: formData
        });

        setShowModal(false);
        setEditId(null);
        setForm({
            name: "",
            categoryId: "",
            price: "",
            stock: "",
            status: true,
            image: null
        });

        fetchProducts();
    };

    const handleEdit = (p) => {
        setForm({
            name: p.name,
            categoryId: p.categoryId?._id,
            price: p.price,
            stock: p.stock,
            status: p.status,
            image: null
        });
        setEditId(p._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        await fetch(`${PRODUCT_API}/${id}`, {
            method: "DELETE"
        });

        fetchProducts();
    };

    return (
        <div>
            <h3>Product Management</h3>

            <button
                className="btn btn-primary mb-3" style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none"
                }}
                onClick={() => {
                    setEditId(null);
                    setForm({
                        name: "",
                        categoryId: "",
                        price: "",
                        stock: "",
                        status: true,
                        image: null
                    });
                    setShowModal(true);
                }}
            >
                + Add Product
            </button>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th width="160">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>
                                {p.image ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${p.image}`}
                                        alt={p.name}
                                        width="50"
                                        height="50"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{p.name}</td>
                            <td>{p.categoryId?.name}</td>
                            <td>₹{p.price}</td>
                            <td>{p.stock}</td>
                            <td>{p.status ? "Active" : "Inactive"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(p)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(p._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {products.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* POPUP */}
            <CommonModal
                show={showModal}
                title={editId ? "Edit Product" : "Add Product"}
                onClose={() => setShowModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-2"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <select
                        className="form-select mb-2"
                        value={form.categoryId}
                        onChange={(e) =>
                            setForm({ ...form, categoryId: e.target.value })
                        }
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />

                    <input
                        type="file"
                        className="form-control mb-2"
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.files[0] })
                        }
                    />

                    <select
                        className="form-select mb-3"
                        value={form.status ? "true" : "false"}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value === "true" })
                        }
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>

                    <button className="btn btn-success w-100" style={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        border: "none"
                    }}>
                        {editId ? "Update Product" : "Save Product"}
                    </button>
                </form>
            </CommonModal>
        </div>
    );
};

export default Product;
