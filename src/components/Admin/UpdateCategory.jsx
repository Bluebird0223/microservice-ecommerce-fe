import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateCategory = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const [category, setCategory] = useState(null)

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

    const updateCategorySubmitHandler = async (e) => {
        e.preventDefault();
        if (!logo) {
            enqueueSnackbar("Add Category image", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("id", params.id)
        formData.set("name", name);
        formData.set("image", logo);
        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateCategory(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Category Created Successfully", { variant: "success" });
                navigate("/admin/category");
            } else {
                enqueueSnackbar("Failed to create category", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    const categoryId = params.id

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await adminCommunication.getCategoryById(categoryId);
                if (response?.data?.success) {
                    const fetchedCategory = response?.data?.category;
                    setCategory(fetchedCategory);
                    setName(fetchedCategory.name);
                    if (fetchedCategory.image && fetchedCategory.image.length > 0) {
                        setLogoPreview(fetchedCategory.image[0].url);
                    }
                }
            } catch (error) {
                enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
            }
        }

        fetchCategoryDetails()
    }, [params?.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Category | Mahahandloom" />

            <Link to="/admin/category" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">

                <form onSubmit={updateCategorySubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <h2 className="font-medium">Category Name</h2>
                            <TextField
                                label="Category Name"
                                variant="outlined"
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <h2 className="font-medium">Category Image</h2>
                            <div className="flex justify-between gap-4 items-start">
                                <div className="w-24 h-25 flex items-center justify-center border rounded-lg p-1">
                                    {!logoPreview ? <ImageIcon /> :
                                        <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />
                                    }
                                </div>
                                <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
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
                            <button
                                type="submit"
                                className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                                disabled={loading}
                            >{loading ? (
                                <CircularProgress size={16} className="text-white" />
                            ) : ("Submit")}
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </>
    );
};

export default UpdateCategory;
