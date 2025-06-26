import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line, Pie, Bar } from "react-chartjs-2";
import MetaData from "../Layouts/MetaData";
import { useSnackbar } from "notistack";
import { adminCommunication } from "../../service/adminCommunication";

const MainData = () => {
   const { enqueueSnackbar } = useSnackbar();

   const [products, setProducts] = useState([]);
   const [orders, setOrders] = useState([]);
   const [users, setUsers] = useState([]);
   const [categories, setCategories] = useState([]);

   let outOfStock = 0;

   products?.forEach((item) => {
      if (item?.stock === 0) {
         outOfStock += 1;
      }
   });

   const categoryList = async () => {
      try {
         const response = await adminCommunication.getAllCategory();
         if (response?.data?.success) {
            setCategories(response?.data?.category);
         }
      } catch (error) {
         enqueueSnackbar("fetch error in get admin product", {
            variant: "error",
         });
      }
   };

   const getAdminProducts = async () => {
      try {
         const response = await adminCommunication.getAdminProducts();
         if (response?.data?.success) {
            setProducts(response?.data?.products);
         } else {
            enqueueSnackbar("Failed to fetch products.", { variant: "error" });
         }
      } catch (error) {
         enqueueSnackbar("fetch error in get admin product", {
            variant: "error",
         });
      }
   };
   const getAllOrders = async () => {
      try {
         const response = await adminCommunication.getAllOrders();
         if (response?.data?.success) {
            setOrders(response?.data?.orders);
         } else {
            enqueueSnackbar("Failed to fetch products.", { variant: "error" });
         }
      } catch (error) {
         enqueueSnackbar("fetch error in get admin orders", {
            variant: "error",
         });
      }
   };
   const getAllUsers = async () => {
      try {
         const response = await adminCommunication.getAllUsers();
         if (response?.data?.success) {
            setUsers(response?.data?.users);
         } else {
            enqueueSnackbar("Failed to fetch products.", { variant: "error" });
         }
      } catch (error) {
         enqueueSnackbar("fetch error in get admin users", {
            variant: "error",
         });
      }
   };

   useEffect(() => {
      getAdminProducts();
      getAllOrders();
      getAllUsers();
      categoryList();
   }, [enqueueSnackbar]);

   let totalAmount = orders?.reduce(
      (total, order) => total + order?.totalPrice,
      0
   );

   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const date = new Date();
   const lineState = {
      labels: months,
      datasets: [
         {
            label: `Sales in ${date?.getFullYear() - 2}`,
            borderColor: "#8A39E1",
            backgroundColor: "#8A39E1",
            data: months?.map((m, i) =>
               orders
                  ?.filter(
                     (od) =>
                        new Date(od?.createdAt)?.getMonth() === i &&
                        new Date(od.createdAt).getFullYear() ===
                           date.getFullYear() - 2
                  )
                  .reduce((total, od) => total + od.totalPrice, 0)
            ),
         },
         {
            label: `Sales in ${date.getFullYear() - 1}`,
            borderColor: "orange",
            backgroundColor: "orange",
            data: months?.map((m, i) =>
               orders
                  ?.filter(
                     (od) =>
                        new Date(od?.createdAt)?.getMonth() === i &&
                        new Date(od.createdAt).getFullYear() ===
                           date.getFullYear() - 1
                  )
                  .reduce((total, od) => total + od.totalPrice, 0)
            ),
         },
         {
            label: `Sales in ${date.getFullYear()}`,
            borderColor: "#4ade80",
            backgroundColor: "#4ade80",
            data: months?.map((m, i) =>
               orders
                  ?.filter(
                     (od) =>
                        new Date(od?.createdAt)?.getMonth() === i &&
                        new Date(od.createdAt).getFullYear() ===
                           date.getFullYear()
                  )
                  .reduce((total, od) => total + od.totalPrice, 0)
            ),
         },
      ],
   };

   const statuses = ["Processing", "Shipped", "Delivered"];

   const pieState = {
      labels: statuses,
      datasets: [
         {
            backgroundColor: ["#9333ea", "#facc15", "#4ade80"],
            hoverBackgroundColor: ["#a855f7", "#fde047", "#86efac"],
            data: statuses?.map(
               (status) =>
                  orders?.filter((item) => item?.orderStatus === status)?.length
            ),
         },
      ],
   };

   const doughnutState = {
      labels: ["Out of Stock", "In Stock"],
      datasets: [
         {
            backgroundColor: ["#ef4444", "#22c55e"],
            hoverBackgroundColor: ["#dc2626", "#16a34a"],
            data: [outOfStock, products?.length - outOfStock],
         },
      ],
   };

   const barState = {
      labels: categories?.map((category) => category?.name),
      datasets: [
         {
            label: "Products",
            borderColor: "#9333ea",
            backgroundColor: "#9333ea",
            hoverBackgroundColor: "#6b21a8",
            data: categories.map(
               (cat) =>
                  products?.filter((item) => item?.category?._id === cat?._id)
                     ?.length
            ),
         },
      ],
   };

   return (
      <>
         <MetaData title="Admin Dashboard | Flipkart" />

         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
               <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
               <h2 className="text-2xl font-bold">
                  ₹{totalAmount?.toLocaleString() ?? 0}
               </h2>
            </div>
            <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
               <h4 className="text-gray-100 font-medium">Total Orders</h4>
               <h2 className="text-2xl font-bold">{orders?.length ?? 0}</h2>
            </div>
            <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
               <h4 className="text-gray-100 font-medium">Total Products</h4>
               <h2 className="text-2xl font-bold">{products?.length ?? 0}</h2>
            </div>
            <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
               <h4 className="text-gray-100 font-medium">Total Users</h4>
               <h2 className="text-2xl font-bold">{users?.length ?? 0}</h2>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 min-w-full">
            <div className="bg-white rounded-xl h-auto w-full lg:w-[60%] shadow-lg p-2">
               <Line data={lineState} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 text-center w-full lg:w-[40%]">
               <span className="font-medium uppercase text-gray-800">
                  Order Status
               </span>
               <div className="w-full sm:w-[50%] lg:w-[100%] m-auto">
                  <Pie data={pieState} />
               </div>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 min-w-full">
            <div className="bg-white rounded-xl h-auto w-full lg:w-[60%] shadow-lg p-2">
               <Bar data={barState} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 text-center w-full lg:w-[40%]">
               <span className="font-medium uppercase text-gray-800">
                  Stock Status
               </span>
               <div className="w-full sm:w-[50%] lg:w-[100%] m-auto">
                  <Doughnut data={doughnutState} />
               </div>
            </div>
         </div>
      </>
   );
};

export default MainData;
