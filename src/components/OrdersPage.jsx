// src/components/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const navigate = useNavigate();

    // Dummy order data - In a real app, this would be fetched from an API
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Simulate fetching orders from an API
        const fetchedOrders = [
            {
                id: 'ORD001',
                date: '2024-06-15',
                total: 125.75,
                status: 'Delivered',
                items: [
                    { name: 'Bluetooth Speaker', quantity: 1, price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1546435345-ad17855b4122?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { name: 'Artisan Soap Bar', quantity: 2, price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1616881900000-8807e3a9c735?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
                ],
                shippingAddress: {
                    street: "123 Main St", city: "Anytown", state: "CA", zip: "90210", country: "USA"
                }
            },
            {
                id: 'ORD002',
                date: '2024-06-01',
                total: 45.00,
                status: 'Processing',
                items: [
                    { name: 'Handmade Ceramic Mug', quantity: 1, price: 18.50, imageUrl: 'https://images.unsplash.com/photo-1546738927-4632a9e1e247?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { name: 'Succulent Plant', quantity: 1, price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1519307767357-19e359998129?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
                ],
                shippingAddress: {
                    street: "123 Main St", city: "Anytown", state: "CA", zip: "90210", country: "USA"
                }
            },
            {
                id: 'ORD003',
                date: '2024-05-20',
                total: 215.99,
                status: 'Cancelled',
                items: [
                    { name: 'Noise-Cancelling Headphones', quantity: 1, price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1625298150794-52c6f147b068?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
                ],
                shippingAddress: {
                    street: "123 Main St", city: "Anytown", state: "CA", zip: "90210", country: "USA"
                }
            },
            {
                id: 'ORD004',
                date: '2024-04-10',
                total: 99.00,
                status: 'Delivered',
                items: [
                    { name: 'Leather Wallet', quantity: 1, price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1621605330830-4e5c7075c3b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { name: 'Desk Organizer', quantity: 1, price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1549400262-63fe45b3d9aa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
                ],
                shippingAddress: {
                    street: "123 Main St", city: "Anytown", state: "CA", zip: "90210", country: "USA"
                }
            }
        ];

        setTimeout(() => { // Simulate network delay
            setOrders(fetchedOrders);
        }, 500);
    }, []);

    // Function to determine status badge color
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="text-gray-500 mb-4 bg-gray-700 rounded-2xl p-2 hover:shadow-md transition-shadow duration-200"
            >
                Back
            </button>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">Your Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No orders found.</p>
                ) : (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <div key={order.id} className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white">
                                {/* Order Summary */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
                                        <p className="text-sm text-gray-600">Order Date: {order.date}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-right sm:text-left">
                                        <p className="text-2xl font-bold text-blue-600">₹{order.total.toFixed(2)}</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Items:</h3>
                                    <ul className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/cccccc/333333?text=N/A'; }} // Fallback image
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Shipping Address (Optional, can be hidden or expanded) */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address:</h3>
                                    <p className="text-gray-700 text-sm">
                                        {order.shippingAddress.street}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;