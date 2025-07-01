import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import publicCommunication from '../service/publicCommunication';


const HomePage = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState('false')

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await publicCommunication.getAllProducts();
                if (response?.status === 200) {
                    setProducts(response?.data?.products);
                } else {
                    enqueueSnackbar("Failed to fetch categories.", { variant: "error" });
                }
            } catch (err) {
                enqueueSnackbar("Error fetching categories: " + err.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [enqueueSnackbar]);

    return (
        <div className="columns-2 sm:columns-3 gap-4 p-4">
            {products.map(product => (
                <motion.div
                    key={product.productId}
                    layoutId={`product-card-${product.productId}`}
                    className="break-inside-avoid mb-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-200"
                    onClick={() => navigate(`/product/${product.productId}`)}
                >
                    <div className='relative'>

                        <motion.img
                            layoutId={`product-image-${product.productId}`}
                            src={product.productPicture}
                            alt={product.productName}
                            className="w-full rounded-lg"
                        />
                        <div className="flex p-2 absolute bottom-0 left-0 right-0 text-black bg-white/10 bg-opacity-70 rounded-t-lg justify-between items-center">
                            <h3 className="font-semibold text-sm">{product.productName}</h3>
                            <p className="text-xs text-gray-700">
                                ₹{product.discountPrice}{' '}
                                <span className="line-through text-gray-400">₹{product.price}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default HomePage
