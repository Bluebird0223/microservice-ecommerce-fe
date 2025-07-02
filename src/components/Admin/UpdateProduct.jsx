import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateProduct = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState("");

    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");


    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const updateSubmitHandler = async (e) => {
        e.preventDefault();

        // Check if the logo is a new File or just a string (existing URL)
        const isFileAttached = logo && typeof logo !== "string";

        let serverResponse;

        try {
            setLoading(true)

            if (isFileAttached) {
                // If a new logo file is selected, send FormData
                const formData = new FormData();
                formData.append("productPicture", logo)
                formData.append("data", JSON.stringify({
                    productId: params.id,
                    productName: name,
                    description: description,
                    price: price,
                    discountPrice: cuttedPrice,
                    categoryId: category,
                    stockQuantity: Number(stock),
                    warranty: warranty,
                    brand:brand,
                }))
                serverResponse = await adminCommunication.updateProduct(true, formData); // Pass true for isFileAttached

            } else {
                // If logo is not changed, send only data (JSON)
                const productData = {
                    productId: params.id,
                    productName: name,
                    description,
                    price,
                    discountPrice: cuttedPrice,
                    categoryId: category,
                    stockQuantity: Number(stock),
                    warranty: warranty.toString(),
                    brand,
                    // When not attaching a new file, the productPicture will be handled by the backend
                    // if it needs to retain the old one, based on not receiving a new file.
                };

                serverResponse = await adminCommunication.updateProduct(false, productData); // Pass false for isFileAttached
            }
            console.log(serverResponse)
            if (serverResponse?.status === 200) {
                enqueueSnackbar("Product Updated Successfully", { variant: "success" });
                navigate("/admin/products");
            } else {
                enqueueSnackbar("Failed to update product", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
    };

    const productId = params.id;
    const fetchCategories = async () => {
        try {
            const response = await adminCommunication.getAllCategory();
            if (response?.status === 200) {
                setCategoriesList(response?.data?.categories);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
        }
    };

    const fetchProductDetails = async () => {
        try {
            let dataToSend = { productId: productId }
            const response = await adminCommunication.getProductById(dataToSend);
            console.log(response?.data?.existingProduct)
            if (response?.status === 200) {
                const { productName, description, price, discountPrice, stockQuantity, warranty, brand, productPicture, categoryId } = response?.data?.existingProduct;
                setName(productName);
                setDescription(description);
                setPrice(price);
                setCuttedPrice(discountPrice);
                setStock(stockQuantity);
                setWarranty(warranty);
                setLogoPreview(productPicture);
                setLogo(productPicture);
                setCategory(categoryId);
                setBrand(brand);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching product: " + error.message, { variant: "error" });
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProductDetails();
    }, [productId, enqueueSnackbar]);

    return (
        <>

            <Link to="/admin/products" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <form onSubmit={updateSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Cutted Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-4 text-gray-600">
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categoriesList?.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            label="Warranty"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                        />
                    </div>

                </div>

                <div className="flex flex-col gap-2 m-2 sm:w-1/2">

                    <h2 className="font-medium text-gray-700">Logo Image</h2>
                    <div className="flex justify-between gap-4 items-start">
                        <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                            {!logoPreview ? <ImageIcon /> :
                                <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />
                            }
                        </div>
                        <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                            Choose Image
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-orange-600 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} className="text-white" />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>

                </div>

            </form>
        </>
    );
};

export default UpdateProduct;