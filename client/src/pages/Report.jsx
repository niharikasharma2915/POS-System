import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/report";

const Report = () => {
    const [data, setData] = useState({
        cashIn: 0,
        cashOut: 0,
        expenses: 0
    });

    const fetchReport = async () => {
        const res = await fetch(API_URL);
        const result = await res.json();
        setData(result);
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const netBalance = data.cashIn - data.cashOut - data.expenses;

    return (
        <div>
            <h3>Reports Summary</h3>

            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="text-muted">Total Cash In</h6>
                            <h4 className="text-success">₹{data.cashIn}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="text-muted">Total Cash Out</h6>
                            <h4 className="text-danger">₹{data.cashOut}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="text-muted">Total Expenses</h6>
                            <h4 className="text-warning">₹{data.expenses}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="text-muted">Net Balance</h6>
                            <h4
                                className={
                                    netBalance >= 0 ? "text-success" : "text-danger"
                                }
                            >
                                ₹{netBalance}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
