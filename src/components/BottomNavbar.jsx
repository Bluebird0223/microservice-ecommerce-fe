import React from 'react';

const BottomNavBar = ({ onNavigate }) => {
    // Navigation items with their icon SVG paths and tooltip text
    const navItems = [
        {
            name: 'Products', page: 'home', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
            )
        },
        {
            name: 'Cart', page: 'cart', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            )
        },
        {
            name: 'My Orders', page: 'orders', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
            )
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg rounded-t-xl z-50">
            <div className="container mx-auto flex justify-center items-center h-full">
                <ul className="flex space-x-8">
                    {navItems.map((item) => (
                        <li key={item.page} className="relative group">
                            <button
                                onClick={() => onNavigate(item.page)}
                                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-700 transition duration-200 ease-in-out text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                {item.icon}
                                <span className="text-xs mt-1">{item.name}</span> {/* Visible text */}
                            </button>
                            {/* Tooltip */}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default BottomNavBar;