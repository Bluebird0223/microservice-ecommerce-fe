import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import { useSnackbar } from "notistack";
import OrderItem from "./OrderItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import SearchIcon from "@mui/icons-material/Search";
import MetaData from "../Layouts/MetaData";
import publicCommunication from "../../service/publicCommunication";
import CancelIcon from "@mui/icons-material/Cancel";
import {
   clearErrors,
   myOrdersRequest,
   myOrdersSuccess,
   newOrderFail,
} from "../../store/orderSlice";
import TuneIcon from "@mui/icons-material/Tune";

const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];
const MyOrders = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   const [status, setStatus] = useState("");
   const [orderTimeData, setOrderTimeData] = useState('');
   const [search, setSearch] = useState("");
   const [filteredOrders, setFilteredOrders] = useState([]);
   const [isFilterOpen, setIsFilterOpen] = useState(true);

   const {
      orders = [],
      loading = false,
      error = null,
   } = useSelector((state) => state.myOrders.myOrders || {});

   // Get User All Orders
   const getUserOrders = async () => {
      try {
         dispatch(myOrdersRequest());
         const serverResponse = await publicCommunication?.fetchMyOrders();
         if (serverResponse?.data?.success) {
            dispatch(myOrdersSuccess(serverResponse?.data?.orders));
         } else {
            dispatch(
               newOrderFail(
                  serverResponse?.data?.message || "Something went wrong!"
               )
            );
         }
      } catch (error) {
         dispatch(newOrderFail(error?.message || "Something went wrong!"));
      }
   };

   useEffect(() => {
      if (loading === false) {
         setFilteredOrders(orders);
      }
   }, [loading, orders]);

   useEffect(() => {
      setSearch("");
      if (!status && !orderTimeData) {
         setFilteredOrders(orders);
         return;
      }

      if (status && [undefined, null,]) {
         if (+orderTimeData === dt.getMonth()) {
            const filteredArr = orders?.filter(
               (order) =>
                  order?.orderStatus === status &&
                  new Date(order?.createdAt)?.getMonth() === +orderTimeData
            );
            setFilteredOrders(filteredArr);
         } else {
            const filteredArr = orders?.filter(
               (order) =>
                  order?.orderStatus === status &&
                  new Date(order?.createdAt)?.getFullYear() === +orderTimeData
            );
            setFilteredOrders(filteredArr);
         }
      } else if (!status) {
         if (+orderTimeData === dt.getMonth()) {
            const filteredArr = orders?.filter(
               (order) => new Date(order?.createdAt)?.getMonth() === +orderTimeData
            );
            setFilteredOrders(filteredArr);
         } else {
            const filteredArr = orders?.filter(
               (order) =>
                  new Date(order?.createdAt)?.getFullYear() === +orderTimeData
            );
            setFilteredOrders(filteredArr);
         }
      } else {
         const filteredArr = orders?.filter(
            (order) => order?.orderStatus === status
         );
         setFilteredOrders(filteredArr);
      }
   }, [status, orderTimeData]);

   const searchOrders = (e) => {
      e.preventDefault();
      if (!search.trim()) {
         enqueueSnackbar("Empty Input", { variant: "warning" });
         return;
      }
      const arr = orders.map((el) => ({
         ...el,
         orderItems: el?.orderItems?.filter((order) =>
            order?.name?.toLowerCase()?.includes(search?.toLowerCase())
         ),
      }));
      setFilteredOrders(arr);
   };

   const clearFilters = () => {
      setStatus("");
      setOrderTimeData('');
   };

   useEffect(() => {
      if (error) {
         enqueueSnackbar(error, { variant: "error" });
         dispatch(clearErrors());
      }
      getUserOrders();
   }, [dispatch]);

   useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 1000){
       setIsFilterOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   return (
      <>
         <MetaData title="My Orders | Mahahandloom" />
         <main className="w-full pt-2 mt-2 dark:bg-primary-black relative mb-10">
            {/* <!-- row --> */}
            <div className="MainWrapper">
               <div className={!isFilterOpen ? "hidden" : "block"}>
                  {/* <!-- nav tiles --> */}
                  <div onClick={() => setIsFilterOpen(!isFilterOpen)}>
                     <CancelIcon />
                  </div>
                  <div className="flex flex-col bg-white dark:bg-primary-black dark:text-primary-beige dark:border dark:border-gray-700 rounded-sm shadow">
                     {/* <!-- filters header --> */}
                     <div className="flex items-center justify-between gap-5 px-4 py-2 border-b dark:border-gray-600">
                        <p className="text-lg font-medium">Filters</p>
                        <span
                           onClick={clearFilters}
                           className="text-blue-600 font-medium text-sm uppercase cursor-pointer hover:text-blue-700"
                        >
                           clear all
                        </span>
                     </div>

                     {/* <!-- order status checkboxes --> */}
                     <div className="flex flex-col py-3 text-sm">
                        <span className="font-medium px-4">ORDER STATUS</span>

                        {/* <!-- checkboxes --> */}
                        <div className="flex flex-col gap-3 px-4 mt-1 pb-3 border-b dark:border-gray-600">
                           <FormControl>
                              <RadioGroup
                                 aria-labelledby="orderstatus-radio-buttons-group"
                                 onChange={(e) => setStatus(e.target.value)}
                                 name="orderstatus-radio-buttons"
                                 value={status}
                              >
                                 {orderStatus.map((el, i) => (
                                    <FormControlLabel
                                       value={el}
                                       control={<Radio size="small" />}
                                       key={i}
                                       label={
                                          <span className="text-sm">{el}</span>
                                       }
                                    />
                                 ))}
                              </RadioGroup>
                           </FormControl>
                        </div>
                        {/* <!-- checkboxes --> */}
                     </div>
                     {/* <!-- order status checkboxes --> */}

                     {/* <!-- order time checkboxes --> */}
                     <div className="flex flex-col pb-2 text-sm">
                        <span className="font-medium px-4">ORDER TIME</span>

                        {/* <!-- checkboxes --> */}
                        <div className="flex flex-col gap-3 mt-1 px-4 pb-3">
                           <FormControl>
                              <RadioGroup
                                 aria-labelledby="ordertime-radio-buttons-group"
                                 onChange={(e) => setOrderTimeData(e.target.value)}
                                 name="ordertime-radio-buttons"
                                 value={orderTimeData}
                              >
                                 {ordertime?.map((el, i) => (
                                    <FormControlLabel
                                       value={el}
                                       control={<Radio size="small" />}
                                       key={i}
                                       label={
                                          <span className="text-sm">
                                             {i === 0 ? "This Month" : el}
                                          </span>
                                       }
                                    />
                                 ))}
                              </RadioGroup>
                           </FormControl>
                        </div>
                        {/* <!-- checkboxes --> */}
                     </div>
                     {/* <!-- order time checkboxes --> */}
                  </div>
                  {/* <!-- nav tiles --> */}
               </div>

               {/* <!-- orders column --> */}
               <div className="flex-1">
                  {loading ? (
                     <Loader />
                  ) : (
                     <div className="flex flex-col gap-3 overflow-hidden">
                        {/* <!-- searchbar --> */}
                        <div className="flex items-center flex-wrap-reverse">
                           <form
                              onSubmit={searchOrders}
                              className="flex items-center justify-between mx-1 sm:mx-0 sm:w-10/12 bg-white dark:bg-gray-300 border rounded hover:shadow"
                           >
                              <input
                                 value={search}
                                 onChange={(e) => setSearch(e.target.value)}
                                 type="search"
                                 name="search"
                                 placeholder="Search your orders here"
                                 className="p-2 text-sm outline-none flex-1 rounded-l dark:bg-gray-300"
                              />
                              <button
                                 type="submit"
                                 className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-primary-blue hover:bg-primary-pink rounded-r flex items-center gap-1"
                              >
                                 <SearchIcon sx={{ fontSize: "22px" }} />
                                 Search Orders
                              </button>
                           </form>
                           <button
                              onClick={() => setIsFilterOpen(!isFilterOpen)}
                              className="filterBtn"
                           >
                              <TuneIcon /> Filter{" "}
                           </button>
                        </div>
                        {/* <!-- searchbar --> */}

                        {filteredOrders && filteredOrders?.length === 0 && (
                           <div className="flex items-center flex-col gap-2 p-8 bg-white">
                              <img
                                 draggable="false"
                                 src="https://rukminim1.flixcart.com/www/100/100/promos/23/08/2020/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png"
                                 alt="Empty Orders"
                              />
                              <span className="text-lg font-medium">
                                 Sorry, no results found
                              </span>
                              <p>Edit search or clear all filters</p>
                           </div>
                        )}
                        {filteredOrders &&
                           filteredOrders?.length > 0 &&
                           filteredOrders
                              ?.map((order, index) => {
                                 const {
                                    _id,
                                    orderStatus,
                                    orderItems,
                                    createdAt,
                                    deliveredAt,
                                    shippedAt,
                                 } = order;
                                   return <OrderItem
                                       key={index}
                                       items={orderItems}
                                       orderId={_id}
                                       orderStatus={orderStatus}
                                       createdAt={createdAt}
                                       deliveredAt={deliveredAt} //?????
                                       shippedAt={shippedAt} //?????
                                    />
                              })
                              .reverse()}
                     </div>
                  )}
               </div>
               {/* <!-- orders column --> */}
            </div>
            {/* <!-- row --> */}
         </main>
      </>
   );
};

export default MyOrders;
