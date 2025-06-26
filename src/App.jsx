import './App.css'
import BottomNavBar from './components/BottomNavbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/Home';
import CartPage from './components/CartPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import OrdersPage from './components/OrdersPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import { AnimatePresence } from 'framer-motion';
import AdminProtectedRoute from './Routes/AdminProtectedRoute';
import LoginPage from './components/Login';
import Dashboard from './components/Admin/Dashboard'
import MainData from './components/Admin/MainData'

export default function App() {
  const location = useLocation();
  return (
    <>
      {/* <Routes>
        <Route path='/' element={<HomePage />} />

      </Routes>
      <BottomNavBar /> */}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes  */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <Dashboard activeTab={0}>
                <MainData />
              </Dashboard>
            </AdminProtectedRoute>
          }></Route>

        </Routes>
      </AnimatePresence>



      {/* <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/order/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/new_product"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <NewProduct />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/product/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/category"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <Category />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/category/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <UpdateCategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_category"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <AddCategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subcategory"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <Subcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_subcategory"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <AddSubcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subcategory/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <UpdateSubcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={5}>
              <UserTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/user/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={5}>
              <UpdateUser />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={6}>
              <ReviewsTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/department"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={7}>
              <Department />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_department"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={7}>
              <AddDepartment />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/department/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={7}>
              <UpdateDepartment />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subdepartment"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={8}>
              <SubDepartment />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_subdepartment"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={8}>
              <AddSubDepartment />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subdepartment/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={8}>
              <UpdateSubDepartment />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/department-users"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={9}>
              <DepartmentUsers />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_department_users"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={9}>
              <AddDepartmentUser />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/department-users/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={9}>
              <UpdateDepartmentUser />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/coupons"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <Coupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_coupon"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <AddCoupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/coupons/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <UpdateCoupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route> */}

      <BottomNavBar />
    </>
  );
}

