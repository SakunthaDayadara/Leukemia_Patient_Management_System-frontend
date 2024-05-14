import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Check if user is authenticated
    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    } else if (allowedRole === "patient" && auth.role !== "patient") {
        return <Navigate to="/patientlogin" />;
    } else if (auth.role !== allowedRole) {
        return <Navigate to="/stafflogin" />;
    } else {
        return <Outlet />;
    }
}

export default RequireAuth;
