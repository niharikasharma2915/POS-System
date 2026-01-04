import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <div className="topbar">
            <h6 className="m-0">Admin Dashboard</h6>


            <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => navigate("/")}
            >
                Logout
            </button>
        </div>
    );
};

export default Topbar;
