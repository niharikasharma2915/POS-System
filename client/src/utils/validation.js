// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation (min 6 characters)
export const isValidPassword = (password) => {
    return password.length >= 6;
};

// Login validation
export const validateLogin = ({ email, password }) => {
    if (!email || !password) {
        return "Email and Password are required";
    }

    if (!isValidEmail(email)) {
        return "Invalid email format";
    }

    if (!isValidPassword(password)) {
        return "Password must be at least 6 characters";
    }

    return "";
};

// Signup validation
export const validateSignup = ({ name, email, password }) => {
    if (!name || !email || !password) {
        return "All fields are required";
    }

    if (name.trim().length < 2) {
        return "Name must be at least 2 characters";
    }

    if (!isValidEmail(email)) {
        return "Invalid email format";
    }

    if (!isValidPassword(password)) {
        return "Password must be at least 6 characters";
    }

    return "";
};
