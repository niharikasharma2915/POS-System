import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { validateSignup } from "../utils/validation";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateSignup({
            name,
            email,
            password
        });

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        navigate("/");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="auth-title">Create Account</h3>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        Sign Up
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
