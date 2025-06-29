// src/routes/GuestRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? children : <Navigate to="/" />;
};

export default GuestRoute;
