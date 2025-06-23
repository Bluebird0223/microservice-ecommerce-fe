import { useState } from 'react'
import './App.css'
import { Header } from './components/Layout';
import BottomNavBar from './components/BottomNavbar';

// import { Provider } from 'react-redux';
// import store from './store';

// import { Header, Footer } from './components/Layout';

// Main App Component
export default function App() {
  // const [currentPage, setCurrentPage] = useState('home');

  // const navigateTo = (page) => {
  //   setCurrentPage(page);
  // };

  // const getPageContent = () => {
  //   switch (currentPage) {
  //     case 'home':
  //       return <ProductList />;
  //     case 'cart':
  //       return <Cart onNavigate={navigateTo} />;
  //     case 'checkout':
  //       return <Checkout onNavigate={navigateTo} />;
  //     case 'orders':
  //       return <OrderHistory />;
  //     default:
  //       return <ProductList />;
  //   }
  // };

  return (
    <>
      Hlo
      <BottomNavBar />
    </>
  );
}

