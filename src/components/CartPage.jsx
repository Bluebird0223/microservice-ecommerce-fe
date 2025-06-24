// src/components/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // More dummy cart data to ensure scrolling
        const fetchedCartItems = [
            {
                id: 'prod001',
                name: 'Vintage Camera',
                imageUrl: 'https://images.unsplash.com/photo-1510125594112-aa66754087f9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 120.00,
                quantity: 1
            },
            {
                id: 'prod002',
                name: 'Handmade Ceramic Mug',
                imageUrl: 'https://images.unsplash.com/photo-1546738927-4632a9e1e247?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 18.50,
                quantity: 2
            },
            {
                id: 'prod005',
                name: 'Bluetooth Speaker',
                imageUrl: 'https://images.unsplash.com/photo-1546435345-ad17855b4122?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 89.99,
                quantity: 1
            },
            {
                id: 'prod004',
                name: 'Botanical Print Set',
                imageUrl: 'https://images.unsplash.com/photo-1629906660126-2581691a3c7f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 75.00,
                quantity: 1
            },
            {
                id: 'prod006',
                name: 'Desk Organizer',
                imageUrl: 'https://images.unsplash.com/photo-1549400262-63fe45b3d9aa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 30.00,
                quantity: 1
            },
            {
                id: 'prod007',
                name: 'Artisan Soap Bar',
                imageUrl: 'https://images.unsplash.com/photo-1616881900000-8807e3a9c735?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 8.00,
                quantity: 3
            },
            {
                id: 'prod008',
                name: 'Designer Backpack',
                imageUrl: 'https://images.unsplash.com/photo-1550340445-6627063f905c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 99.00,
                quantity: 1
            },
            {
                id: 'prod009',
                name: 'Succulent Plant',
                imageUrl: 'https://images.unsplash.com/photo-1519307767357-19e359998129?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 15.00,
                quantity: 2
            }
        ];
        setCartItems(fetchedCartItems);
    }, []);

    // ... (rest of the functions like calculateSubtotal, handleQuantityChange, handleRemoveItem, handleCheckout remain the same)
    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const handleQuantityChange = (id, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout! (This is a placeholder)');
    };

    const subtotal = calculateSubtotal();

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            {/* Back Button */}

            <button
                onClick={() => navigate(-1)}
                className="mb-2 bg-blue-500/15 backdrop-blur-md border border-blue-500/40 text-blue-900 p-2 shadow-lg rounded-4xl z-50 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">Your Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Cart Items List Container - ADDED MAX-H AND OVERFLOW */}
                        <div className="md:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2 hide-scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-200 mr-4"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/96x96/cccccc/333333?text=N/A'; }} // Fallback
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition"
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-100 text-gray-800 px-4 py-1 border-t border-b border-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="ml-4 text-red-600 hover:text-red-800 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="text-xl font-bold text-blue-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary (1/3 width on medium screens) */}
                        <div className="md:col-span-1 bg-blue-50 p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">Order Summary</h2>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-semibold text-lg text-gray-800">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                                <span>Shipping:</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-xl text-gray-900 border-t pt-4 mt-4">
                                <span>Total:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg shadow-md"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;