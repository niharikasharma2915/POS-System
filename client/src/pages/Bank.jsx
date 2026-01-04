import { useEffect, useState } from "react";
import CommonModal from "../components/CommonModal";

const API_URL = "http://localhost:5000/api/bank";

const Bank = () => {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        bankName: "",
        accountNumber: "",
        status: true
    });
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchBanks = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setList(data);
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.bankName || !form.accountNumber) return;

        if (editId) {
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
        }

        setForm({ bankName: "", accountNumber: "", status: true });
        setEditId(null);
        setShowModal(false);
        fetchBanks();
    };

    const handleEdit = (bank) => {
        setForm({
            bankName: bank.bankName,
            accountNumber: bank.accountNumber,
            status: bank.status
        });
        setEditId(bank._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this bank?")) return;

        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchBanks();
    };

    return (
        <div>
            <h3>Bank Management</h3>

            <button
                className="btn btn-primary mb-3" style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none"
                }}
                onClick={() => {
                    setForm({ bankName: "", accountNumber: "", status: true });
                    setEditId(null);
                    setShowModal(true);
                }}
            >
                + Add Bank
            </button>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>Status</th>
                        <th width="150">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((bank) => (
                        <tr key={bank._id}>
                            <td>{bank.bankName}</td>
                            <td>{bank.accountNumber}</td>
                            <td>{bank.status ? "Active" : "Inactive"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(bank)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(bank._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {list.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No banks found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* POPUP */}
            <CommonModal
                show={showModal}
                title={editId ? "Edit Bank" : "Add Bank"}
                onClose={() => setShowModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-2"
                        placeholder="Bank Name"
                        value={form.bankName}
                        onChange={(e) =>
                            setForm({ ...form, bankName: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Account Number"
                        value={form.accountNumber}
                        onChange={(e) =>
                            setForm({ ...form, accountNumber: e.target.value })
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
                        {editId ? "Update" : "Save"}
                    </button>
                </form>
            </CommonModal>
        </div>
    );
};

export default Bank;
