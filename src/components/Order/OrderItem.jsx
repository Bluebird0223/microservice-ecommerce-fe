import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import { useCurrencyConverter } from "../../utils/useCurrencyConverter";

const OrderItem = ({
  items,
  orderId,
  createdAt,
  deliveredAt,
  orderStatus,
  shippedAt,
}) => {
  const { convertPrice, symbol } = useCurrencyConverter();
  
  return items?.map((item, i) => (
    <Link
      key={i}
      to={`/order_details/${orderId}`}
      className="flex p-4 items-start bg-white dark:bg-primary-black dark:border-gray-600 dark:text-primary-beige border rounded gap-3 hover:shadow-lg"
    >
      {/* <!-- image container --> */}
      <div className="w-32 h-20">
        <img
          draggable="false"
          className="h-full w-full object-contain"
          src={item?.image}
          alt={item?.name}
        />
      </div>
      {/* <!-- image container --> */}

      {/* <!-- order desc container --> */}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="text-sm capitalize">
            {item?.name?.length > 40
              ? `${item?.name?.substring(0, 40)}...`
              : item?.name}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            
            Quantity: {item?.quantity}
          </p>
          <p className="text-xs text-gray-500">
            Total: {`${symbol()} ${convertPrice(item?.quantity * item?.price)}`} 
          </p>
        </div>

        <div className="flex flex-col lg:flex-row mt-1 lg:mt-0 gap-2 lg:gap-20 lg:w-1/2">
          <p className="text-sm">{`${symbol()} ${convertPrice(item?.price)}`} </p>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium flex items-center gap-1">
              {orderStatus === "Shipped" ? (
                <>
                  <span className="text-primary-orange pb-0.5">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Shipped on {formatDate(shippedAt)}
                </>
              ) : orderStatus === "Delivered" ? (
                <>
                  <span className="text-primary-green pb-0.5">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Delivered on {formatDate(deliveredAt)}
                </>
              ) : (
                <>
                  <span className="text-primary-green pb-0.5">
                    <RadioButtonUncheckedIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Ordered on {formatDate(createdAt)}
                </>
              )}
            </p>
            {orderStatus === "Delivered" ? (
              <p className="text-xs ml-1">Your item has been {orderStatus}</p>
            ) : orderStatus === "Shipped" ? (
              <p className="text-xs ml-1">Your item has been {orderStatus}</p>
            ) : (
              <p className="text-xs ml-1">Seller has processed your order</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default OrderItem;
