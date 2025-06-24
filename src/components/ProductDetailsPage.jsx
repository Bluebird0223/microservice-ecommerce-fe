import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = [
    { id: '1', name: 'Vintage Camera', imageUrl: 'https://placehold.co/300x400/E6E6FA/000000?text=Camera', price: 120.00, originalPrice: 150.00, description: 'A classic vintage camera, perfect for collectors and enthusiasts. Captures timeless moments with analog charm.' },
    { id: '2', name: 'Handmade Ceramic Mug', imageUrl: 'https://placehold.co/350x300/FFE4E1/000000?text=Mug', price: 18.50, originalPrice: 25.00, description: 'Uniquely crafted ceramic mug, ideal for your morning coffee or tea. Microwave and dishwasher safe.' },
    { id: '3', name: 'Leather Wallet', imageUrl: 'https://placehold.co/280x250/F0F8FF/000000?text=Wallet', price: 45.00, originalPrice: 60.00, description: 'Slim and durable genuine leather wallet with multiple card slots and a money clip.' },
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

    return (
        <div className="max-w-2xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 mb-2 hover:underline"
            >
                &larr; Back
            </button>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-1">
                ₹{product.price.toFixed(2)}{' '}
                <span className="line-through text-gray-400">₹{product.originalPrice.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">{product.description}</p>
        </div>
    );
};

export default ProductDetailsPage;
