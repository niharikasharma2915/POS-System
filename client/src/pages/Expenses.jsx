import { useEffect, useState } from "react";
import CommonModal from "../components/CommonModal";

const API_URL = "http://localhost:5000/api/expense";

const Expenses = () => {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        date: "",
        type: "Cash"
    });
    const [showModal, setShowModal] = useState(false);

    const fetchExpenses = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setList(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.amount || !form.date) return;

        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setForm({ title: "", amount: "", date: "", type: "Cash" });
        setShowModal(false);
        fetchExpenses();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;

        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchExpenses();
    };

    return (
        <div>
            <h3>Expenses</h3>

            <button
                className="btn btn-primary mb-3" style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none"
                }}
                onClick={() => {
                    setForm({ title: "", amount: "", date: "", type: "Cash" });
                    setShowModal(true);
                }}
            >
                + Add Expense
            </button>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th width="120">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((exp) => (
                        <tr key={exp._id}>
                            <td>{exp.title}</td>
                            <td>₹{exp.amount}</td>
                            <td>{exp.date}</td>
                            <td>{exp.type}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(exp._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {list.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No expenses found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* POPUP */}
            <CommonModal
                show={showModal}
                title="Add Expense"
                onClose={() => setShowModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-2"
                        placeholder="Expense Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />

                    <input
                        type="date"
                        className="form-control mb-2"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />

                    <select
                        className="form-select mb-3"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option>Cash</option>
                        <option>Bank</option>
                    </select>

                    <button className="btn btn-success w-100" style={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        border: "none"
                    }}>
                        Save Expense
                    </button>
                </form>
            </CommonModal>
        </div>
    );
};

export default Expenses;
