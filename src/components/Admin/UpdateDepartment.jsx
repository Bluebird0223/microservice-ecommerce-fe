import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateDepartment = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");

    const updateDepartmentSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("id", params.id)
        formData.set("name", name);
        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Department Updated Successfully", { variant: "success" });
                navigate("/admin/department");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
        setLoading(false)
    }

    const handleClick = () => {
        navigate("/admin/department")
    }

    const departmentId = params.id
    const fetchDepartmentDetails = async () => {
        try {
            const response = await adminCommunication.getDepartmentById(departmentId);
            if (response?.data?.success) {
                const fetchedDepartment = response?.data?.department;
                setName(fetchedDepartment.name);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
        }
    }

    useEffect(() => {
        fetchDepartmentDetails()
    }, [params?.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Department | Mahahandloom" />
            <Link to="/admin/department" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Department</h2>
                <form onSubmit={updateDepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">

                            <TextField
                                label="Department Name"
                                variant="outlined"
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />


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

export default UpdateDepartment;
