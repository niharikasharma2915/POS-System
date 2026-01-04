import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { validateLogin } from "../utils/validation";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateLogin({ email, password });
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        navigate("/admin");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="auth-title">POS Login</h3>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn auth-btn w-100 text-white">
                        Login
                    </button>
                </form>

                <div className="auth-footer">
                    Don’t have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
