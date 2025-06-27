import { getCookie } from "cookies-next";

export function checkDeptTabAccess(tabName) {
    const deptDetails = process.env.REACT_APP_DEPTDETAILS;
    const adminDetails = process.env.REACT_APP_ADMINDETAILS
    if (getCookie(adminDetails)) {
        JSON?.parse(getCookie(adminDetails));
        return { tabAccess: true, permission: "write" }
    }

    if (getCookie(deptDetails)) {
        const deptUser = JSON?.parse(getCookie(deptDetails));
        const tabAccess = deptUser.tabAccess.some(tab => tab?.tab?.toLowerCase() === tabName?.toLowerCase());
        const permission = deptUser.tabAccess.find(tab => tab?.tab?.toLowerCase() === tabName?.toLowerCase())?.permission;
        return { tabAccess, permission };
    }

    // return { tabAccess, permission };
}
