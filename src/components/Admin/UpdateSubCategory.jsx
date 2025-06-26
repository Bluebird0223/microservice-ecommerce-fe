import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateSubcategory = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const updateSubcategorySubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set("id", params.id);
        formData.set("name", name);
        formData.set("category", category);

        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateSubcategory(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Category Updated Successfully", { variant: "success" });
                navigate("/admin/subcategory");
            } else {
                enqueueSnackbar("Failed to update category", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
        setLoading(false)
    };

    const handleClick = () => {
        navigate("/admin/subcategory");
    };

    const subCategoryId = params.id;
    const fetchSubcategoryDetails = async () => {
        try {
            const response = await adminCommunication.getSubcategoryById(subCategoryId);
            if (response?.data?.success) {
                const fetchedCategory = response?.data?.category;
                setCategory(fetchedCategory?.category?._id);
                setName(fetchedCategory?.name);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching subcategory: " + error.message, { variant: "error" });
        }
    };

    // Fetch all categories for the dropdown
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


    useEffect(() => {

        fetchSubcategoryDetails();
        fetchCategories();
    }, [subCategoryId, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Subcategory | Mahahandloom" />

            <Link to="/admin/subcategory" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Sub Category</h2>
                <form onSubmit={updateSubcategorySubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Category Name"
                                variant="outlined"
                                size="small"
                                fullWidth
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
                                {categoriesList?.map((category) => (
                                    <MenuItem key={category?._id} value={category?._id}>
                                        {category?.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            
                            <button 
                            type="submit" 
                            className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" 
                            disabled={loading}
                            >{loading ? (
                                <CircularProgress size={16} className="text-white" />
                            ) : (
                                "Submit"
                            )}</button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default UpdateSubcategory;
