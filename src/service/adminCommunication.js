import axios from "axios";
import { getCookie } from "cookies-next";

const nodeEnvironment = process.env.REACT_APP_NODE_ENV;
const serverUrl = process.env.REACT_APP_NODE_URL;
// const tokenName = process.env.REACT_APP_ADMIN_TOKENNAME;
// const deptToken = process.env.REACT_APP_DEPT_TOKENNAME
let token = null;
if (getCookie(process.env.REACT_APP_ADMIN_TOKENNAME)) {
    token = process.env.REACT_APP_ADMIN_TOKENNAME;
} else if (getCookie(process.env.REACT_APP_DEPT_TOKENNAME)) {
    token = process.env.REACT_APP_DEPT_TOKENNAME;
}

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

export const adminCommunication = {
    getAdminDetails: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/me`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getDeptDetails: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/dept/me`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }

    },
    login: async function (dataToSend) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/login`, dataToSend, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }

    },
    deptLoginUser: async function (dataToSend) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/admin/dept/login`, dataToSend, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }

    },
    adminLogin: async function (dataToSend) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/login`, config, dataToSend, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getAllUsers: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/users`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getUserById: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/user/${id}`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    registerUser: async function (dataToSend) {
        try {
            return axios.post(`${getServerUrl()}/api/v1/register`, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(error?.message);
        }
    },
    updateUserStatus: async function (id) {
        try {
            return axios.post(`${getServerUrl()}/api/v1/admin/user/status`, { id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            console.error(error?.message);
        }

    },
    createProduct: async function (productData) {
        try {
            console.log(getCookie(token))
            return axios.post(`${getServerUrl()}/api/v1/admin/product/new`, productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            console.error(error?.message);
        }

    },
    updateProduct: async function (productData) {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return await axios.post(`${getServerUrl()}/api/v1/admin/product/update`, productData, config)
        } catch (error) {
            console.error(error?.message)
        }
    },
    getAdminProducts: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/products`, config)
        } catch (error) {
            console.error(error?.message)
        }
    },
    getAllCategory: async function () {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.get(`${getServerUrl()}/api/v1/product/category`, config)
        } catch (error) {
            console.error(error?.message)
        }
    },
    getAllSubCategory: async function () {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.get(`${getServerUrl()}/api/v1/product/sub-category`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    createCategory: async function (categoryData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/product/category/new`, categoryData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    createSubcategory: async function (subCategoryData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/product/sub-category/new`, subCategoryData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateSubCategoryStatus: async function (id) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/product/sub-category/toggle-active`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };

        }
    },
    updateCategoryStatus: async function (id) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/product/category/toggle-active`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getCategoryById: async function (id) {
        try {
            return await axios.get(`${getServerUrl()}/api/v1/product/category/${id}`);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateCategory: async function (categoryData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/product/category/update`, categoryData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateSubcategory: async function (subCategoryData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/product/sub-category/update`, subCategoryData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    deleteCategory: async function (id) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.delete(`${getServerUrl()}/api/v1/product/category/delete`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getSubcategoryById: async function (id) {
        try {
            return await axios.get(`${getServerUrl()}/api/v1/product/sub-category/${id}`);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getAllReviewsForAdmin: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return await axios.get(`${getServerUrl()}/api/v1/all-review`, config)
        } catch (error) {
            console.error(error?.message)
        }
    },
    deleteReview: async function (reviewId, productId) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return await axios.delete(`${getServerUrl()}/api/v1/admin/reviews?id=${reviewId}&productId=${productId}`, config);

        } catch (error) {
            console.error(error?.message)
        }
    },
    getAllOrders: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }

            return axios.get(`${getServerUrl()}/api/v1/admin/orders`, config);

        } catch (error) {
            console.error(error?.message)
        }

    },
    updateOrderStatus: async function (dataToUpdate) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.put(`${getServerUrl()}/api/v1/admin/order/status`, dataToUpdate, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }

    },
    getProductById: async function (id) {
        try {
            return await axios.get(`${getServerUrl()}/api/v1/product/${id}`);
        } catch (error) {
            console.error(error?.message)
        }
    },
    getOrderById: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return await axios.get(`${getServerUrl()}/api/v1/order/${id}`, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },




    // department user
    getAllDepartments: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/department/all-department`, config)
        } catch (error) {
            console.error(error?.message)
        }
    },
    updateDepartmentStatus: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.post(`${getServerUrl()}/api/v1/admin/department/status`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };

        }
    },
    createDepartment: async function (departmentData) {
        try {
            const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie(token)}` } }
            return axios.post(`${getServerUrl()}/api/v1/admin/department`, departmentData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getDepartmentById: async function (id) {
        try {
            return await axios.get(`${getServerUrl()}/api/v1/admin/department/get-department/${id}`);
        } catch (error) {
            return { data: { success: false, message: error.message } };;

        }
    },
    updateDepartment: async function (updateData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/admin/department/update`, updateData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    createSubDepartment: async function (subdepartmentData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.post(`${getServerUrl()}/api/v1/admin/sub-department`, subdepartmentData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getAllSubDepartment: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/sub-department`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateSubDepartmentStatus: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.post(`${getServerUrl()}/api/v1/admin/sub-department/status`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getSubdepartmentById: async function (id) {
        try {

            return await axios.get(`${getServerUrl()}/api/v1/admin/sub-department/${id}`);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateSubdepartment: async function (updateData) {
        try {
            const config = { headers: { "Content-Type": "application/json" } }
            return axios.put(`${getServerUrl()}/api/v1/admin/sub-department/update`, updateData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getAllDepartmentUsers: async function () {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/dept/all-users`, config)
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateDepartmentUserStatus: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.post(`${getServerUrl()}/api/v1/admin/dept/status`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getSubDepartmentByDepartment: async function (id) {
        try {
            return axios.get(`${getServerUrl()}/api/v1/admin/department/get-sub-department/${id}`);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }

    },
    createDepartmentUser: async function (userData) {
        try {
            return axios.post(`${getServerUrl()}/api/v1/admin/dept/create`, userData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateDepartmentUser: async function (userData) {
        try {
            return axios.post(`${getServerUrl()}/api/v1/admin/dept/update`, userData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    departmentUserDetails: async function (id) {
        try {
            return axios.get(`${getServerUrl()}/api/v1/admin/dept/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },


    // coupons
    getAllCoupons: async function () {
        try {
            return axios.get(`${getServerUrl()}/api/v1/admin/all-coupon`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                },
            });
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateCouponStatus: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.post(`${getServerUrl()}/api/v1/admin/coupon/status`, { id }, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    createCoupon: async function (couponData) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.post(`${getServerUrl()}/api/v1/admin/coupon`, couponData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    getCouponById: async function (id) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.get(`${getServerUrl()}/api/v1/admin/coupon/${id}`, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    },
    updateCoupon: async function (id, updateData) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie(token)}`
                }
            }
            return axios.put(`${getServerUrl()}/api/v1/admin/coupon/${id}`, updateData, config);
        } catch (error) {
            return { data: { success: false, message: error.message } };
        }
    }
}
