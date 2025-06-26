// src/ProductDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import tatya from '../assets/tataya-vinchoo.jpg';

const products = [
    { id: '1', name: 'Vintage Camera', imageUrl: 'https://placehold.co/300x400/E6E6FA/000000?text=Camera', price: 120.00, originalPrice: 150.00, description: 'A classic vintage camera, perfect for collectors and enthusiasts. Captures timeless moments with analog charm.' },
    { id: '2', name: 'Handmade Ceramic Mug', imageUrl: 'https://placehold.co/350x300/FFE4E1/000000?text=Mug', price: 18.50, originalPrice: 25.00, description: 'Uniquely crafted ceramic mug, ideal for your morning coffee or tea. Microwave and dishwasher safe.' },
    { id: '3', name: 'Leather Wallet', imageUrl: tatya, price: 45.00, originalPrice: 60.00, description: 'Slim and durable genuine leather wallet with multiple card slots and a money clip.' },
    { id: '4', name: 'Botanical Print Set', imageUrl: 'https://placehold.co/250x350/F8F8FF/000000?text=Prints', price: 75.00, originalPrice: 90.00, description: 'Set of three high-quality botanical prints to add a touch of nature to your living space.' },
    { id: '5', name: 'Bluetooth Speaker', imageUrl: 'https://placehold.co/320x280/F5F5DC/000000?text=Speaker', price: 89.99, originalPrice: 110.00, description: 'Portable Bluetooth speaker with rich bass and crystal-clear sound. Perfect for indoor and outdoor use.' },
    { id: '6', name: 'Desk Organizer', imageUrl: 'https://placehold.co/290x290/E0FFFF/000000?text=Organizer', price: 30.00, originalPrice: 40.00, description: 'Stylish and functional desk organizer to keep your workspace tidy and efficient.' },
    { id: '7', name: 'Artisan Soap Bar', imageUrl: 'https://placehold.co/200x300/FFF0F5/000000?text=Soap', price: 8.00, originalPrice: 10.00, description: 'Handmade soap bar with natural ingredients and a refreshing lavender scent.' },
    { id: '8', name: 'Designer Backpack', imageUrl: 'https://placehold.co/400x300/F0FFF0/000000?text=Backpack', price: 99.00, originalPrice: 130.00, description: 'Ergonomic and spacious backpack, ideal for daily commute or weekend trips. Features multiple compartments.' },
    { id: '9', name: 'Succulent Plant', imageUrl: 'https://placehold.co/220x280/F5FFFA/000000?text=Plant', price: 15.00, originalPrice: 20.00, description: 'Low-maintenance succulent plant, a perfect addition to any desk or shelf. Comes in a decorative pot.' },
    { id: '10', name: 'Noise-Cancelling Headphones', imageUrl: 'https://placehold.co/350x380/FDF5E6/000000?text=Headphones', price: 199.99, originalPrice: 249.99, description: 'Premium noise-cancelling headphones for an immersive audio experience. Long-lasting battery life.' },
];

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(p => p.id === id);

    if (!product) return <div className="p-4">Product not found</div>;

    const addToCart = (id) => {
        console.log("added to cart", id);
    };

    const handelBuyNow = (id) => {
        console.log("handle buy now", id);
    };

    // Base delay for details section, ensuring it starts after image animation
    const baseDelay = 0.3; // This is the delay for the image transition to finish

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col sm:flex-row items-start sm:items-center relative"
        >
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-blue-500/15 backdrop-blur-md border border-blue-500/40 text-blue-400 p-2 shadow-lg rounded-full z-50 cursor-pointer flex items-center justify-center h-10 w-10"
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

            <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                layoutId={`product-image-${product.id}`}
                className="w-full sm:w-1/2 flex justify-center items-center p-4"
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto rounded-lg max-w-sm object-contain"
                />
            </motion.div>

            <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full sm:w-1/2 p-4 sm:pl-8 mt-4 sm:mt-0">
                {/* Product Name (Header) */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: baseDelay + 0.1, duration: 0.4 }} // Initial delay + staggered delay
                    className="text-3xl font-bold text-white mb-2"
                >
                    {product.name}
                </motion.h1>

                {/* Price Information */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: baseDelay + 0.2, duration: 0.4 }} // Increased delay
                    className="text-xl text-blue-400 mb-2"
                >
                    ₹{product.price.toFixed(2)}{' '}
                    <span className="line-through text-gray-500 ">₹{product.originalPrice.toFixed(2)}</span>
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: baseDelay + 0.3, duration: 0.4 }} // Increased delay
                    className="text-base text-gray-300 mb-4"
                >
                    {product.description}
                </motion.p>

                {/* Buttons Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: baseDelay + 0.4, duration: 0.4 }} // Increased delay for buttons
                    className="flex gap-4"
                >
                    <button
                        onClick={() => addToCart(product.id)}
                        className='relative p-[1px] rounded-full overflow-hidden
                                   bg-gradient-to-r from-blue-400 to-blue-800
                                  transition-all duration-300 group cursor-pointer'
                    >
                        <span className='block px-6 py-2 rounded-full
                                         bg-gray-800 text-white
                                         transition-colors duration-300'>
                            Add to cart
                        </span>
                    </button>
                    <button
                        onClick={() => handelBuyNow(product.id)}
                        className='relative p-[1px] rounded-full overflow-hidden
                                   bg-gradient-to-r from-red-400 to-red-800
                                  transition-all duration-300 group cursor-pointer'
                    >
                        <span className='block px-6 py-2 rounded-full
                                         bg-gray-800 text-gray-300
                                         transition-colors duration-300'>
                            Buy Now
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetailsPage;