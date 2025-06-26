import axios from "axios";
import { getCookie } from "cookies-next";

const nodeEnvironment = process.env.REACT_APP_NODE_ENV;
const serverUrl = process.env.REACT_APP_NODE_URL;
const tokenName = process.env.REACT_APP_TOKENNAME;

export function getServerUrl() {
   if (nodeEnvironment === "development") {
      return serverUrl;
   }

   if (nodeEnvironment === "machine_IP") {
      return serverUrl;
   }

   if (nodeEnvironment === "server") {
      return serverUrl;
   }

   return serverUrl;
}

export const publicCommunication = {
   registerUser: async function (formData) {
      try {
         const config = { headers: { "Content-Type": "multipart/form-data" } };
         return await axios.post(
            `${getServerUrl()}/api/v1/register`,
            formData,
            config
         );
      } catch (error) {
         return { data: { success: false, message: error.message } };
      }
   },
updateUserProfile: async function (formData) {
   try {
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/me/update`,
         formData,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
loginUser: async function (email, password) {
   try {
      const config = { headers: { "Content-Type": "application/json" } };
      return await axios.post(
         `${getServerUrl()}/api/v1/login`,
         { email, password },
         config
      );
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
getUserDetails: async function () {
   try {
      const config = {
         headers: {
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.get(`${getServerUrl()}/api/v1/me`, config);
   } catch (error) {
      console.error(error?.message);
   }
},
getAllProducts: async function (
   keyword,
   price,
   ratings,
   currentPage,
   category,
   subcategory,
   controller
) {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
         signal: controller?.signal,
      };
      //   let url = "/api/v1/products";
      return await axios.post(
         `${getServerUrl()}/api/v1/products`,
         { keyword, price, ratings, currentPage, categoryId: category, subCategoryId: subcategory },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
getSingleProduct: async function (id) {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
      };
      return await axios.get(
         `${getServerUrl()}/api/v1/product/${id}`,
         config
      );
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
addToWishlist: async function (productId, userId) {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/user/wishlist`,
         { productId, userId },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
removeFromWishlist: async function (productId, userId) {
   try {
      const config = {
         headers: { "Content-Type": "application/json" },
         data: { productId, userId },
      };
      return await axios.delete(
         `${getServerUrl()}/api/v1/user/wishlist/remove`,
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
getUserProductsData: async function () {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.get(
         `${getServerUrl()}/api/v1/user/all-products`,
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
addToCart: async function (productId, quantity) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/user/cart`,
         { productId, quantity },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
updateCart: async function (productId, quantity) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/user/cart/update`,
         { productId, quantity },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
removeCartItem: async function (productId) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/user/cart/remove`,
         { productId },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         return { data: { success: false, message: error.message } };
      }
   }
},
removeAllCartItems: async function () {
   try {
      const config = {
         headers: {
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/user/cart/remove-all`,
         {},
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
saveForLater: async function (productId, quantity) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/user/save-for-later`,
         { productId, quantity },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         console.error(error?.message);
      }
   }
},
removeFromSaveForLater: async function (productId) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/user/save-for-later/remove`,
         { productId },
         config
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         console.error(error?.message);
      }
   }
},
rateProduct: async function (rating, comment, productId) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/review`,
         { rating, comment, productId },
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
fetchMyOrders: async function () {
   try {
      const config = {
         headers: {
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      }
      return await axios.get(`${getServerUrl()}/api/v1/orders/me`, config);
   } catch (error) {
      console.error(error?.message);
   }
},
newOrder: async function (orderDetails) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/order/new`,
         orderDetails,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
fetchOrderDetails: async function (id) {
   try {
      const config = {
         headers: {
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };

      return await axios.get(`${getServerUrl()}/api/v1/order/${id}`, config);
   } catch (error) {
      console.error(error?.message);
   }
},
getAllCategory: async function () {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.get(`${getServerUrl()}/api/v1/product/category`, config);
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
getAllSarees: async function (category, subCategory) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(`${getServerUrl()}/api/v1/product/category/sarees`, { category, subCategory }, config);
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
getProductByCategory: async function (category) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(`${getServerUrl()}/api/v1/product/category/products`, { category }, config);
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
newContact: async function (dataToSend) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/user/contact-us`,
         dataToSend,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
resetPassword: async function (formData) {
   try {
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.put(
         `${getServerUrl()}/api/v1/password/update`,
         formData,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
sendOtpToMail: async function (email) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/password/send-otp`,
         { email },
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
verifyOTP: async function (dataToSend) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/password/verify-otp`,
         dataToSend,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
forgotPassword: async function (dataToSend) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/password/forgot`,
         dataToSend,
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
newSubscriber: async function (customerEmail) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/user/subscription`,
         { customerEmail },
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
submitFeedback: async function (rating, message) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.post(
         `${getServerUrl()}/api/v1/user/testimonials`,
         { rating, message },
         config
      );
   } catch (error) {
      console.error(error?.message);
   }
},
fetchTestimonials: async function (controller) {
   try {
      return await axios.get(
         `${getServerUrl()}/api/v1/user/all-testimonials`,
         {
            signal: controller?.signal,
         }
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         console.error(error?.message);
      }
   }
},
fetchCategoryAndSubCategories: async function (controller) {
   try {
      return await axios.get(
         `${getServerUrl()}/api/v1/product/category/sub-categories`,
         {
            signal: controller?.signal,
         }
      );
   } catch (error) {
      if (error.name === "CanceledError") {
         //do nothing
      } else {
         console.error(error?.message);
      }
   }
},
applyCoupon: async function (couponCode, totalCartAmount) {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie(tokenName)}`,
         },
      };
      return await axios.post(`${getServerUrl()}/api/v1/user/coupon/apply`, { couponCode, totalCartAmount }, config);
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
increaseVisitors: async function () {
   try {
      return await axios.post(`${getServerUrl()}/api/v1/user/visitors`);
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }

},
getVisitors: async function () {
   try {
      return await axios.get(`${getServerUrl()}/api/v1/user/visitors`)
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
},
getRatings: async function () {
   try {
      return await axios.get(`${getServerUrl()}/api/v1/user/testimonials/rating`)
   } catch (error) {
      return { data: { success: false, message: error.message } };
   }
}
};

export default publicCommunication;
