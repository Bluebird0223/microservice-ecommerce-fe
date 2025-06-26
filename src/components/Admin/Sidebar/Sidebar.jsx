import { Link, useNavigate } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch } from "react-redux";
import "./Sidebar.css";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { adminCommunication } from "../../../service/adminCommunication";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DiscountIcon from "@mui/icons-material/Discount";

const navMenu = [
   {
      icon: <EqualizerIcon />,
      label: "Dashboard",
      ref: "/admin/dashboard",
   },
   {
      icon: <ShoppingBagIcon />,
      label: "Orders",
      ref: "/admin/orders",
   },
   {
      icon: <InventoryIcon />,
      label: "Products",
      ref: "/admin/products",
   },
   {
      icon: <CategoryIcon />,
      label: "Category",
      ref: "/admin/category",
   },
   {
      icon: <CategoryIcon />,
      label: "Sub-category",
      ref: "/admin/subcategory",
   },
   {
      icon: <GroupIcon />,
      label: "Users",
      ref: "/admin/users",
   },
   {
      icon: <ReviewsIcon />,
      label: "Reviews",
      ref: "/admin/reviews",
   },
   {
      icon: <AccountTreeIcon />,
      label: "Departments",
      ref: "/admin/department",
   },
   {
      icon: <AccountTreeIcon />,
      label: "Sub-departments",
      ref: "/admin/subdepartment",
   },
   {
      icon: <PeopleAltIcon />,
      label: "Department Users",
      ref: "/admin/department-users",
   },
   {
      icon: <DiscountIcon />,
      label: "coupon",
      ref: "/admin/coupons",
   },
   {
      icon: <LogoutIcon />,
      label: "Logout",
   },
];

const Sidebar = ({ activeTab, setToggleSidebar, toggleSidebar }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
   const [user, setUser] = useState({});
   const [deptUser, setDeptUser] = useState({});

   useEffect(() => {
      const adminDetails = Cookies.get(process.env.REACT_APP_ADMINDETAILS);
      if (adminDetails) {
         const parsedUser = JSON.parse(adminDetails);
         setUser(parsedUser);
      }
      
      const userDepartment = Cookies.get(process.env.REACT_APP_DEPTDETAILS);
      if (userDepartment) {
         const parsedDeptUser = JSON.parse(userDepartment);
         setDeptUser(parsedDeptUser);
      }
   }, []);

   const handleLogout = () => {
      Cookies.remove(process.env.REACT_APP_ADMIN_TOKENNAME);
      Cookies.remove(process.env.REACT_APP_ADMINDETAILS);
      enqueueSnackbar("Logout Successfully", { variant: "success" });
      navigate("/login");
   };

   const hasWritePermission = (tab) => {

      // const hasTabAccess = deptUser?.tabAccess.some(
      //    (access) => access.tab.toLowerCase() === tab.toLowerCase(),
      // );
      // return hasTabAccess;
        // Check if the department user has any tab access
   if (!deptUser?.tabAccess || deptUser?.tabAccess.length === 0) {
      return false;
   }

   // Iterate through all the tab access and check permission
   const tabInfo = deptUser?.tabAccess.find((access) => access?.tab?.toLowerCase() === tab?.toLowerCase());

   // If tab is found and its permission is not 'none'
   return tabInfo && tabInfo.permission !== "none";
   };

   return (
      <aside
         className={`${toggleSidebar ? "sidebar" : "sidebarClosed"
            } min-h-screen pb-5 bg-gray-800 text-white border-r`}
      >
         <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5 ">
            <Avatar
               alt="Avatar"
            // src={user.avatar.url}
            />
            {toggleSidebar && (
               <div className="flex flex-col gap-0">
                  <span className="font-medium text-lg">
                     {user?.name ?? deptUser?.name ?? "Peter Parker"}
                  </span>
                  <span className="text-gray-300 text-sm">
                     {user?.email ?? deptUser?.email ?? "peterparker@gmail.com"}
                  </span>
               </div>
            )}
            <button
               onClick={() => setToggleSidebar(!toggleSidebar)}
               className=" bg-gray-800 m-auto rounded-full w-8 h-8 flex items-center justify-center"
            >
               {toggleSidebar ? <CloseIcon /> : <MenuIcon />}
            </button>
         </div>

         <div className="flex flex-col w-full gap-0 my-8">
            {navMenu.map((item, index) => {
               const { icon, label, ref } = item;
               if (hasWritePermission(label)) {
                  return (
                     <>
                        {label === "Logout" ? (
                           <button
                              title="Logout"
                              onClick={handleLogout}
                              className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium"
                           >
                              <span>{icon}</span>
                              {toggleSidebar && <span>{label}</span>}
                           </button>
                        ) : (
                           <Link
                              to={ref}
                              title={label}
                              className={`${activeTab === index
                                 ? "bg-gray-700"
                                 : "hover:bg-gray-700"
                                 } flex gap-3 items-center py-3 px-4 font-medium`}
                           >
                              <span>{icon}</span>
                              {toggleSidebar && <span>{label}</span>}
                           </Link>
                        )}
                     </>
                  );
               } else if (user?.role === "admin") {
                  return (
                     <>
                        {label === "Logout" ? (
                           <button
                              title="Logout"
                              onClick={handleLogout}
                              className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium"
                           >
                              <span>{icon}</span>
                              {toggleSidebar && <span>{label}</span>}
                           </button>
                        ) : (
                           <Link
                              to={ref}
                              title={label}
                              className={`${activeTab === index
                                 ? "bg-gray-700"
                                 : "hover:bg-gray-700"
                                 } flex gap-3 items-center py-3 px-4 font-medium`}
                           >
                              <span>{icon}</span>
                              {toggleSidebar && <span>{label}</span>}
                           </Link>
                        )}
                     </>
                  );
               }else{
                  return null
               }
            })}
         </div>
      </aside>
   );
};

export default Sidebar;