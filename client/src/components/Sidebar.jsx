import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

const Sidebar = ({ collapsed }) => {
    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
    
            <h3 className="sidebar-title">POS Admin</h3>

            <NavLink to="/admin" className="sidebar-link">
                <i className="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/pos" className="sidebar-link">
                <i className="bi bi-receipt"></i>
                <span>POS</span>
            </NavLink>


            <NavLink to="/admin/category" className="sidebar-link">
                <i className="bi bi-tags"></i>
                <span>Category</span>
            </NavLink>

            <NavLink to="/admin/product" className="sidebar-link">
                <i className="bi bi-box"></i>
                <span>Product</span>
            </NavLink>

            <NavLink to="/admin/bank" className="sidebar-link">
                <i className="bi bi-bank"></i>
                <span>Bank</span>
            </NavLink>
            <NavLink to="/admin/cash" className="sidebar-link">
                <i className="bi bi-cash"></i>
                <span>Cash</span>
            </NavLink>

            <NavLink to="/admin/expenses" className="sidebar-link">
                <i className="bi bi-cash-stack"></i>
                <span>Expenses</span>
            </NavLink>

            <NavLink to="/admin/report" className="sidebar-link">
                <i className="bi bi-bar-chart"></i>
                <span>Reports</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
