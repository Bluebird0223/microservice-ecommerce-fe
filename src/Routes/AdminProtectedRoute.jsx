import { getCookie } from "cookies-next";
import { Navigate } from "react-router-dom";
const ADMIN_TOKEN=import.meta.env.VITE_APP_ADMIN_TOKENNAME
const ADMINDETAILS=import.meta.env.VITE_APP_ADMINDETAILS
const DEPT_TOKENNAME=import.meta.env.VITE_APP_DEPT_TOKENNAME
const DEPTDETAILS=import.meta.env.VITE_APP_DEPTDETAILS

const AdminProtectedRoute = ({ children, isAdmin, isDeptUser }) => {
    const adminToken = getCookie(ADMIN_TOKEN);
    const adminDetails = getCookie(ADMINDETAILS);

    const deptToken = getCookie(DEPT_TOKENNAME);
    const deptDetails = getCookie(DEPTDETAILS);

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

    // // If trying to access as a dept user but the user is not a dept user
    // if (isDeptUser && deptUser?.role !== "DeptUser") {
    //     return <Navigate to="/dept/login" />;
    // }

    return children;
};

export default AdminProtectedRoute;
