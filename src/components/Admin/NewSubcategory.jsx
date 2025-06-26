import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import { CircularProgress } from '@mui/material';


const AddSubcategory = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    // let loading = false

    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [category, setCategory] = useState('');
    const [logoPreview, setLogoPreview] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleLogoChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }
    const newProductSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("category", category);
        try {
            setLoading(true)
            const serverResponse = await adminCommunication.createSubcategory(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Sub category Created Successfully", { variant: "success" });
                navigate("/admin/subcategory");
            } else {
                enqueueSnackbar("Failed to create category", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }

        setLoading(false)
    }

    const getCategoryList = async () => {
        try {
            const serverResponse = await adminCommunication.getAllCategory();
            if (serverResponse?.data?.success) {
                setCategories(serverResponse?.data?.category);
            } else {
                enqueueSnackbar("Failed to fetch categories", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error fetching categories: ${error.message}`, { variant: "error" });
        }
    }

    useEffect(() => {
        getCategoryList()
    }, [enqueueSnackbar])

    return (
        <>
            <MetaData title="Admin: New Subcategory | Mahahandloom" />
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Category</h2>
                <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Category Name"
                                variant="outlined"
                                fullWidth
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

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
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <button 
                            type="submit" 
                            className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                            disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={16} className="text-white" />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>

                    </div>

                </form>

            </div>
        </>
    );
};

export default AddSubcategory;
