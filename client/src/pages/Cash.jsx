import { useEffect, useState } from "react";
import CommonModal from "../components/CommonModal";

const API_URL = "http://localhost:5000/api/cash";

const Cash = () => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        type: "IN",
        amount: "",
        reason: "",
        date: ""
    });

    const fetchCash = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setList(data);
    };

    useEffect(() => {
        fetchCash();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.amount || !form.reason || !form.date) return;

        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setForm({ type: "IN", amount: "", reason: "", date: "" });
        setShowModal(false);
        fetchCash();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this entry?")) return;

        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchCash();
    };

    return (
        <div>
            <h3>Cash Management</h3>

            <button
                className="btn btn-primary mb-3" style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none"
                }}
                onClick={() => setShowModal(true)}
            >
                + Add Cash Entry
            </button>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th width="120">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((c) => (
                        <tr key={c._id}>
                            <td>
                                <span
                                    className={`badge ${c.type === "IN" ? "bg-success" : "bg-danger"
                                        }`}
                                >
                                    {c.type}
                                </span>
                            </td>
                            <td>₹{c.amount}</td>
                            <td>{c.reason}</td>
                            <td>{c.date}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(c._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {list.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No cash entries found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* POPUP */}
            <CommonModal
                show={showModal}
                title="Add Cash Entry"
                onClose={() => setShowModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <select
                        className="form-select mb-2"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="IN">Cash In</option>
                        <option value="OUT">Cash Out</option>
                    </select>

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Reason"
                        value={form.reason}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    />

                    <input
                        type="date"
                        className="form-control mb-3"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />

                    <button className="btn btn-success w-100" style={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        border: "none"
                    }}>
                        Save
                    </button>
                </form>
            </CommonModal>
        </div>
    );
};

export default Cash;
