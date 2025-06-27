// useCurrencyConverter.js
import { useSelector, useDispatch } from "react-redux";
import { currencies } from "./currencies";

export const useCurrencyConverter = () => {
   const { exchangeRates, selectedCurrency } = useSelector(
      (state) => state?.currency
   );

   const convertPrice = (price) => {
      const newPrice = Number(price);
      if (exchangeRates?.[selectedCurrency]) {
         return (newPrice * exchangeRates?.[selectedCurrency])?.toFixed(2);
      }
      return newPrice?.toFixed(2); // If no conversion rate is found
   };

   const symbol = () => {
      const data = currencies?.find(
         (ele) => ele?.currencyName === selectedCurrency
      );
      if (exchangeRates?.[selectedCurrency]) {
         return data?.symbol;
      }
      return "₹";
   };

   return { convertPrice, selectedCurrency, symbol };
};
