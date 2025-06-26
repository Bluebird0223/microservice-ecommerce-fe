import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateSubDepartment = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [department, setDepartment] = useState('');
    const [departmentsList, setDepartmentsList] = useState([]);


    const updateSubdepartmentSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("id", params.id);
        formData.set("name", name);
        formData.set("departmentId", department);

        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateSubdepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Sub Department Updated Successfully", { variant: "success" });
                navigate("/admin/subdepartment");
            } else {
                enqueueSnackbar("Failed to update sub department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
        setLoading(false)
    };

    const handleClick = () => {
        navigate("/admin/subdepartment");
    };

    const subDepartmentId = params.id;
    const fetchSubdepartmentDetails = async () => {
        try {
            const response = await adminCommunication.getSubdepartmentById(subDepartmentId);
            if (response?.data?.success) {
                const fetchedDepartment = response?.data?.subDepartment;
                setDepartment(fetchedDepartment?.department);
                setName(fetchedDepartment?.name);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching subdepartment: " + error.message, { variant: "error" });
        }
    };

    // Fetch all categories for the dropdown
    const fetchDepartments = async () => {
        try {
            const response = await adminCommunication.getAllDepartments();
            if (response?.data?.success) {
                setDepartmentsList(response.data.departments);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
        }
    };

    useEffect(() => {
        fetchSubdepartmentDetails();
        fetchDepartments();
    }, [subDepartmentId, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Subdepartment | Mahahandloom" />

            <Link to="/admin/subdepartment" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Department</h2>
                <form onSubmit={updateSubdepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Department Name"
                                variant="outlined"
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                label="Department"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                {departmentsList?.map((department) => (
                                    <MenuItem key={department._id} value={department._id}>
                                        {department.name}
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

export default UpdateSubDepartment;
