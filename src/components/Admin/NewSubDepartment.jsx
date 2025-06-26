import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import { CircularProgress } from '@mui/material';

const AddSubDepartment = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [loading, setLoading] = useState()
    const [name, setName] = useState("");
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {
        setDepartment(e.target.value);
    };

    const newProductSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("departmentId", department);
        try {
            setLoading(true)
            const serverResponse = await adminCommunication.createSubDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Sub Department Created Successfully", { variant: "success" });
                navigate("/admin/subdepartment");
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

    const getDepartmentList = async () => {
        try {
            const serverResponse = await adminCommunication.getAllDepartments();
            if (serverResponse?.data?.success) {
                setDepartments(serverResponse?.data?.departments);
            } else {
                enqueueSnackbar("Failed to fetch categories", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error fetching categories: ${error.message}`, { variant: "error" });
        }
    }

    useEffect(() => {
        getDepartmentList()
    }, [enqueueSnackbar])

    return (
        <>
            <MetaData title="Admin: New Subdepartment | Mahahandloom" />
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Department</h2>
                <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">

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
                                {departments.map((department) => (
                                    <MenuItem key={department._id} value={department._id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <button
                                type="submit"
                                className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                                disabled={loading}
                            >
                                {loading ? (<CircularProgress size={16} className="text-white" />)
                                    : ("Submit")}
                            </button>
                            <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/subdepartment">Cancel</Link>
                        </div>
                    </div>

                </form>


            </div>
        </>
    );
};

export default AddSubDepartment;
