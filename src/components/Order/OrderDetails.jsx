import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import TrackStepper from "./TrackStepper";
import MetaData from "../Layouts/MetaData";
import blankImg from "../../assets/images/blank_img.jpeg";
import publicCommunication from "../../service/publicCommunication";
import {
   clearErrors,
   orderDetailsFail,
   orderDetailsRequest,
   orderDetailsSuccess,
} from "../../store/orderSlice";
import { useCurrencyConverter } from "../../utils/useCurrencyConverter";

const OrderDetails = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();
   const { convertPrice, symbol } = useCurrencyConverter();
   const params = useParams();

   const { order, error, loading } = useSelector(
      (state) => state.myOrders?.orderDetails
   );

   // Get order detail
   const getOrderDetails = async () => {
      try {
         dispatch(orderDetailsRequest());
         const serverResponse = await publicCommunication?.fetchOrderDetails(
            params?.id
         );
         if (serverResponse?.data?.success) {
            dispatch(orderDetailsSuccess(serverResponse?.data?.order));
         } else {
            dispatch(
               orderDetailsFail(error?.message || "Something went wrong!")
            );
         }
      } catch (error) {
         dispatch(orderDetailsFail(error?.message || "Something went wrong!"));
      }
   };

   useEffect(() => {
      if (error) {
         enqueueSnackbar(error, { variant: "error" });
         dispatch(clearErrors());
      }
      getOrderDetails();
   }, [params?.id]);

   return (
      <>
         <MetaData title="Order Details | Mahahandloom" />
         <main className="w-full py-5 dark:bg-primary-black">
            {loading ? (
               <Loader />
            ) : (
               <>
                  {/* {order && order?.user && order?.shippingInfo &&  */}
                  <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                     <div className="flex bg-white dark:bg-primary-black dark:border dark:text-primary-beige dark:border-gray-600 shadow rounded-sm min-w-full">
                        <div className="sm:w-1/2 border-r dark:border-gray-600">
                           <div className="flex flex-col gap-3 my-8 mx-10">
                              <h3 className="font-medium text-lg">
                                 Delivery Address
                              </h3>
                              <h4 className="font-medium capitalize">
                                 {order?.user?.name ?? "User"}
                              </h4>
                              <p className="text-sm">{`${
                                 order?.shippingInfo?.address ??
                                 `HANDLOOMS CORPORATION LTD “MSHC Complex" Umred Road Nagpur 440024 Maharashtra, India`
                              }, ${order?.shippingInfo?.city ?? "Nagpur"}, ${
                                 order?.shippingInfo?.state ?? "Maharashtra"
                              } - ${order?.shippingInfo?.pincode}`}</p>
                              <div className="flex gap-2 text-sm">
                                 <p className="font-medium">Email</p>
                                 <p>
                                    {order?.user?.email ??
                                       "peterparker@gmail.com"}
                                 </p>
                              </div>
                              <div className="flex gap-2 text-sm">
                                 <p className="font-medium">Phone Number</p>
                                 <p>
                                    {order?.shippingInfo?.phoneNo ??
                                       "7447337890"}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {order?.orderItems &&
                        order?.orderItems?.map((item) => {
                           const { _id, image, name, price, quantity } = item;
                           return (
                              <div
                                 className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5 dark:bg-primary-black dark:border dark:border-gray-600 dark:text-primary-beige"
                                 key={_id}
                              >
                                 <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                    <div className="w-full sm:w-32 h-20">
                                       <img
                                          draggable="false"
                                          className="h-full w-full object-contain"
                                          src={image ?? blankImg}
                                          alt={name ?? "order img"}
                                       />
                                    </div>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                       <p className="text-sm capitalize">
                                          {name?.length > 60
                                             ? `${name?.substring(0, 60)}...`
                                             : name}
                                       </p>
                                       <p className="text-xs text-gray-600 mt-2">
                                          Quantity: {quantity}
                                       </p>
                                       <p className="text-xs text-gray-600">
                                          {`${symbol()} ${convertPrice(price)}`}
                                       </p>
                                       <span className="font-medium">
                                          {`${symbol()} ${convertPrice(
                                             quantity * price
                                          )}`}
                                       </span>
                                    </div>
                                 </div>

                                 <div className="flex flex-col w-full sm:w-1/2">
                                    <h3 className="font-medium sm:text-center">
                                       Order Status
                                    </h3>
                                    <TrackStepper
                                       orderOn={order?.createdAt}
                                       shippedAt={order?.shippedAt}
                                       deliveredAt={order?.deliveredAt}
                                       activeStep={
                                          order?.orderStatus === "Delivered"
                                             ? 2
                                             : order?.orderStatus === "Shipped"
                                             ? 1
                                             : 0
                                       }
                                    />
                                 </div>
                              </div>
                           );
                        })}
                  </div>
                  {/* } */}
               </>
            )}
         </main>
      </>
   );
};

export default OrderDetails;
