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
    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: ""
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    }

    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.title.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    }

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    }

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index))
    }

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index))
    }

    const handleLogoChange = (e) => {
        const reader = new FileReader();

        setLogo("");
        setLogoPreview("");

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldData) => [...oldData, reader.result]);
                    setImages((oldData) => [...oldData, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const updateSubmitHandler = async (e) => {
        e.preventDefault();

        // required field checks
        if (highlights.length <= 0) {
            enqueueSnackbar("Add Highlights", { variant: "warning" });
            return;
        }
        if (specs.length <= 1) {
            enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("cuttedPrice", cuttedPrice);
        formData.set("category", category);
        formData.set("subcategory", subcategory);
        formData.set("stock", stock);
        formData.set("warranty", warranty);
        formData.set("brandname", 'Mahandloom');
        formData.set('id', params.id)

        // Only set the logo if a new one is selected
        if (logo) {
            formData.set("thumbnail", logo);
        }

        // Append old images
        oldImages.forEach((image) => {
            formData.append("images", image);
        });

        // Append new images
        images.forEach((image) => {
            formData.append("images", image);
        });

        // Append highlights
        highlights.forEach((h) => {
            formData.append("highlights", h);
        });

        // Append specifications
        specs.forEach((s) => {
            formData.append("specifications", JSON.stringify(s));
        });


        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateProduct(formData);
            if (serverResponse?.data?.success) {
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
    const fetchSubcategory = async () => {
        try {
            const response = await adminCommunication.getAllSubCategory();

            if (response?.data?.success) {
                setSubCategoriesList(response?.data?.subcategory);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching subcategory: " + error.message, { variant: "error" });
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await adminCommunication.getAllCategory();
            if (response?.data?.success) {
                setCategoriesList(response?.data?.category);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
        }
    };

    const fetchProductDetails = async () => {
        try {
            const response = await adminCommunication.getProductById(productId);
            if (response?.data?.success) {
                const { name, description, price, cuttedPrice, stock, warranty, brand, highlights, specifications, images, category, subcategory } = response?.data?.product;

                setName(name);
                setDescription(description);
                setPrice(price);
                setCuttedPrice(cuttedPrice);
                setStock(stock);
                setWarranty(warranty);
                setHighlights(highlights);
                setSpecs(specifications);
                setOldImages(images);
                setImages(images);
                setCategory(category?._id);
                setSubCategory(subcategory?._id);
                setLogo(brand?.logo?.url);
                setLogoPreview(brand?.logo?.url);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching product: " + error.message, { variant: "error" });
        }
    };

    useEffect(() => {

        fetchSubcategory();
        fetchCategories();
        fetchProductDetails();
    }, [productId, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Product | Flipkart" />

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
                    <div className="flex justify-between gap-4">
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
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Sub-Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={subcategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                        >
                            {subCategoriesList?.map((subCategory) => (
                                <MenuItem key={subCategory._id} value={subCategory._id}>
                                    {subCategory.name}
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

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border rounded">
                            <input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} type="text" placeholder="Highlight" className="px-2 flex-1 outline-none border-none" />
                            <span onClick={() => addHighlight()} className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer">Add</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            {highlights.map((h, i) => (
                                <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                    <p className="text-green-800 text-sm font-medium">{h}</p>
                                    <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 m-2 sm:w-1/2">

                    <h2 className="font-medium">Thumbnail Image</h2>
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
                    <h2 className="font-medium">Specifications</h2>

                    <div className="flex justify-evenly gap-2 items-center">
                        <TextField value={specsInput.title} onChange={handleSpecsChange} name="title" label="Name" placeholder="Model No" variant="outlined" size="small" />
                        <TextField value={specsInput.description} onChange={handleSpecsChange} name="description" label="Description" placeholder="WJDK42DF5" variant="outlined" size="small" />
                        <span onClick={() => addSpecs()} className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer">Add</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {specs.map((spec, i) => (
                            <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                                <p className="text-gray-500 font-medium">{spec.title}</p>
                                <p>{spec.description}</p>
                                <span onClick={() => deleteSpec(i)} className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer">
                                    <DeleteIcon />
                                </span>
                            </div>
                        ))}
                    </div>

                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                        {oldImages && oldImages.map((image, i) => (
                            <img draggable="false" src={image.url} alt="Product" key={i} className="w-full h-full object-contain" />
                        ))}
                        {imagesPreview.map((image, i) => (
                            <img draggable="false" src={image} alt="Product" key={i} className="w-full h-full object-contain" />
                        ))}
                    </div>
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose Files
                    </label>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
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