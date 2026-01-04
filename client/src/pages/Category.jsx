import { useEffect, useState } from "react";
import CommonModal from "../components/CommonModal";

const API_URL = "http://localhost:5000/api/category";

const Category = () => {
    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCategories = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setList(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // ADD / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        if (editId) {
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            });
        }

        setName("");
        setEditId(null);
        setShowModal(false);
        fetchCategories();
    };

    // EDIT
    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat._id);
        setShowModal(true);
    };

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        fetchCategories();
    };

    return (
        <div>
            <h3>Category Management</h3>

            {/* ADD BUTTON */}
            <button
                className="btn btn-primary mb-3" style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none"
                }}
                onClick={() => {
                    setName("");
                    setEditId(null);
                    setShowModal(true);
                }}
            >
                + Add Category
            </button>

            {/* TABLE */}
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th width="150">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((cat) => (
                        <tr key={cat._id}>
                            <td>{cat.name}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(cat)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(cat._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {list.length === 0 && (
                        <tr>
                            <td colSpan="2" className="text-center">
                                No categories found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* POPUP MODAL */}
            <CommonModal
                show={showModal}
                title={editId ? "Edit Category" : "Add Category"}
                onClose={() => setShowModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button className="btn btn-success w-100" style={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        border: "none"
                    }}>
                        {editId ? "Update" : "Save"}
                    </button>
                </form>
            </CommonModal>
        </div>
    );
};

export default Category;
