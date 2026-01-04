import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";
import PageTransition from "../components/PageTransition";




const REPORT_API = "http://localhost:5000/api/report";
const PRODUCT_COUNT_API = "http://localhost:5000/api/product/count";

const Dashboard = ({ children }) => {
    const location = useLocation();
    const isDashboardHome = location.pathname === "/admin";

    
    
    const [report, setReport] = useState({ cashIn: 0, cashOut: 0, expenses: 0 });
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const reportRes = await fetch(REPORT_API);
                const reportData = await reportRes.json();
                setReport(reportData);

                const productRes = await fetch(PRODUCT_COUNT_API);
                const productData = await productRes.json();
                setTotalProducts(productData.totalProducts);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            }
        };

        if (isDashboardHome) {
            fetchDashboardData();
        }
    }, [isDashboardHome]);

    const netBalance =
        report.cashIn - report.cashOut - report.expenses;

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Topbar />

                <div className="dashboard-content">

                    {/* SHOW ONLY ON /admin */}
                    {isDashboardHome && (
                        <>
                            {/* WELCOME */}
                            
                                

                            {/* DASHBOARD CARDS */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-3">
                                    <div className="dashboard-card">
                                        <span>Total Products</span>
                                        <h3>{totalProducts !== null ? totalProducts : <div className="skeleton" />}</h3>

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="dashboard-card success">
                                        <span>Total Cash In</span>
                                        <h3>₹{report.cashIn}</h3>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="dashboard-card danger">
                                        <span>Total Cash Out</span>
                                        <h3>₹{report.cashOut}</h3>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div
                                        className={`dashboard-card ${netBalance >= 0 ? "success" : "danger"
                                            }`}
                                    >
                                        <span>Net Balance</span>
                                        <h3>₹{netBalance}</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <PageTransition>
                        {children}
                    </PageTransition>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
