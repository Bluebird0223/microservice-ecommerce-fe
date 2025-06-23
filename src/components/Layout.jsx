// src/components/Layout.jsx (Conceptual File - Header/Footer)

import React from 'react';

export const Header = ({ onNavigate }) => (
    <header className="bg-gray-800 text-white p-4 shadow-md rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-300">MyShop</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={() => onNavigate('home')}
                            className="text-gray-300 hover:text-white transition duration-200 ease-in-out px-3 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Products
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onNavigate('cart')}
                            className="text-gray-300 hover:text-white transition duration-200 ease-in-out px-3 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Cart
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onNavigate('orders')}
                            className="text-gray-300 hover:text-white transition duration-200 ease-in-out px-3 py-2 rounded-lg hover:bg-gray-700"
                        >
                            My Orders
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export const Footer = () => (
    <footer className="bg-gray-800 text-gray-400 p-4 mt-8 shadow-inner rounded-t-xl">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
            <p className="text-sm">Powered by React, Redux & Tailwind CSS</p>
        </div>
    </footer>
);
