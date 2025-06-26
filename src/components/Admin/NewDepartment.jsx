import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import { CircularProgress } from '@mui/material';

const AddDepartment = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    let success
    let error

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const newDepartmentSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.set("name", name);
        try {
            const serverResponse = await adminCommunication.createDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Department Created Successfully", { variant: "success" });
                navigate("/admin/department");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            navigate("/admin/department");
        }
    }, [navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Department | Mahahandloom" />
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Department</h2>
                <form onSubmit={newDepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">

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
                            ) : ("Submit")}</button>
                            <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/department">Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default AddDepartment;
