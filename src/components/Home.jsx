import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import tatya from '../assets/tataya-vinchoo.jpg';
import camera from '../assets/camera.jpg'
import hdd from '../assets/hdd.jpg'
import headset from '../assets/headset.jpg'
import laptop from '../assets/laptop.jpg'
import phone from '../assets/phone.jpg'
import psremote from '../assets/psremote.jpg'
import remote from '../assets/remote.jpg'

const products = [
    { id: '1', name: 'Vintage Camera', imageUrl: camera, price: 120.00, originalPrice: 150.00, description: 'A classic vintage camera, perfect for collectors and enthusiasts. Captures timeless moments with analog charm.' },
    { id: '2', name: 'Laptop', imageUrl: laptop, price: 18.50, originalPrice: 25.00, description: 'Uniquely crafted ceramic mug, ideal for your morning coffee or tea. Microwave and dishwasher safe.' },
    { id: '3', name: 'Tatya vinchoo', imageUrl: tatya, price: 45.00, originalPrice: 60.00, description: 'Slim and durable genuine leather wallet with multiple card slots and a money clip.' },
    { id: '4', name: 'Phone', imageUrl: phone, price: 75.00, originalPrice: 90.00, description: 'Set of three high-quality botanical prints to add a touch of nature to your living space.' },
    { id: '5', name: 'Remote', imageUrl: remote, price: 89.99, originalPrice: 110.00, description: 'Portable Bluetooth speaker with rich bass and crystal-clear sound. Perfect for indoor and outdoor use.' },
    { id: '6', name: 'Ps remote', imageUrl: psremote, price: 30.00, originalPrice: 40.00, description: 'Stylish and functional desk organizer to keep your workspace tidy and efficient.' },
    { id: '7', name: 'Hdd', imageUrl: hdd, price: 8.00, originalPrice: 10.00, description: 'Handmade soap bar with natural ingredients and a refreshing lavender scent.' },
    { id: '8', name: 'Designer Backpack', imageUrl: 'https://placehold.co/400x300/F0FFF0/000000?text=Backpack', price: 99.00, originalPrice: 130.00, description: 'Ergonomic and spacious backpack, ideal for daily commute or weekend trips. Features multiple compartments.' },
    { id: '9', name: 'Succulent Plant', imageUrl: 'https://placehold.co/220x280/F5FFFA/000000?text=Plant', price: 15.00, originalPrice: 20.00, description: 'Low-maintenance succulent plant, a perfect addition to any desk or shelf. Comes in a decorative pot.' },
    { id: '10', name: 'Noise-Cancelling Headphones', imageUrl: headset, price: 199.99, originalPrice: 249.99, description: 'Premium noise-cancelling headphones for an immersive audio experience. Long-lasting battery life.' },
];


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="columns-2 sm:columns-3 gap-4 p-4">
            {products.map(product => (
                <motion.div
                    key={product.id}
                    layoutId={`product-card-${product.id}`}
                    className="break-inside-avoid mb-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-200"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    <div className='relative'>

                        <motion.img
                            layoutId={`product-image-${product.id}`}
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full rounded-lg"
                        />
                        <div className="flex p-2 absolute bottom-0 left-0 right-0 text-black bg-white/10 bg-opacity-70 rounded-t-lg justify-between items-center">
                            <h3 className="font-semibold text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-700">
                                ₹{product.price.toFixed(2)}{' '}
                                <span className="line-through text-gray-400">₹{product.originalPrice.toFixed(2)}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default HomePage
