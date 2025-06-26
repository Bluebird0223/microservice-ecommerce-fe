import { getCookie } from "cookies-next";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children, isAdmin, isDeptUser }) => {
    const adminToken = getCookie(process.env.REACT_APP_ADMIN_TOKENNAME);
    const adminDetails = getCookie(process.env.REACT_APP_ADMINDETAILS);

    const deptToken = getCookie(process.env.REACT_APP_DEPT_TOKENNAME);
    const deptDetails = getCookie(process.env.REACT_APP_DEPTDETAILS);

    // Check if either admin or department user token exists
    const isAdminAuthenticated = !!adminToken;
    const isDeptUserAuthenticated = !!deptToken;

    // Parse user details if tokens exist
    const user = adminDetails ? JSON.parse(adminDetails) : null;
    const deptUser = deptDetails ? JSON.parse(deptDetails) : null;

    // Check if either admin or dept user is authenticated
    const isAuthenticated = isAdminAuthenticated || isDeptUserAuthenticated;

    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    // If trying to access as an admin but the user is not an admin
    if (isAdmin && user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    // If trying to access as a dept user but the user is not a dept user
    if (isDeptUser && deptUser?.role !== "DeptUser") {
        return <Navigate to="/dept/login" />;
    }

    return children; 
};

export default AdminProtectedRoute;
