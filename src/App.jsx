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

export default function App() {

  return (
    <>
      {/* <Routes>
        <Route path='/' element={<HomePage />} />

      </Routes>
      <BottomNavBar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
      <BottomNavBar />
    </>
  );
}

