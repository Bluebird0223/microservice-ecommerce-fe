import TextField from '@mui/material/TextField';
import { Fragment, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CircularProgress } from '@mui/material';

const AddDepartmentUser = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [department, setDepartment] = useState("");
    const [subDepartment, setSubDepartment] = useState("");
    const [departmentsList, setDepartmentsList] = useState([]);
    const [subDepartmentsList, setSubDepartmentsList] = useState([]);

    const [tabAccess, setTabAccess] = useState([
        { tab: 'dashboard', permission: 'write' },
        { tab: 'orders', permission: 'none' },
        { tab: 'products', permission: 'none' },
        { tab: 'category', permission: 'none' },
        { tab: 'sub-category', permission: 'none' },
        // { tab: 'users', permission: 'none' },
        { tab: 'reviews', permission: 'none' },
        { tab: 'departments', permission: 'none' },
        { tab: 'sub-departments', permission: 'none' },
        // { tab: 'department-users', permission: 'none' },
        { tab: 'coupon', permission: 'none' },
        { tab: 'logout', permission: 'write' },
    ]);


    const handleTabPermissionChange = (index, event) => {
        const newTabAccess = [...tabAccess];
        newTabAccess[index].permission = event.target.value;
        setTabAccess(newTabAccess);
    };

    const newUserSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();

            formData.set("name", name);
            formData.set("email", email);
            formData.set("mobile", mobile);
            formData.set("departmentId", department);
            formData.set("subdepartmentId", subDepartment);
            formData.set("tabAccess", JSON.stringify(tabAccess));

            const serverResponse = await adminCommunication.createDepartmentUser(formData);
            if (serverResponse?.data?.success) {
                navigate("/admin/department-users");
            } else {
                enqueueSnackbar("Failed to create new user", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }

    }

    const fetchDepartments = async () => {
        try {
            const response = await adminCommunication.getAllDepartments();
            if (response?.data?.success) {
                setDepartmentsList(response?.data?.departments);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
        }
    };


    const fetchSubDepartment = async () => {
        try {
            const response = await adminCommunication.getSubDepartmentByDepartment(department);
            if (response?.data?.success) {
                setSubDepartmentsList(response?.data?.subDepartments);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching subdepartment: " + error.message, { variant: "error" });
        }
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);
        setSubDepartment('');
        fetchSubDepartment(selectedDepartment);
    };


    useEffect(() => {
        fetchDepartments();
    }, [enqueueSnackbar]);



    return (
        <>
            <MetaData title="Admin: Add Department User | Flipkart" />
            <form onSubmit={newUserSubmitHandler} encType="multipart/form-data" className="justify-center sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <h1 className="text-lg font-medium uppercase">New Department User</h1>
                <div className="mt-8 sm:mx-auto gap-4 sm:w-full sm:max-w-md">
                    <div className="flex flex-col gap-3 m-2 mb-4 w-full">

                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Mobile"
                            variant="outlined"
                            size="small"
                            type='number'
                            required
                            value={mobile}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (/^\d{0,10}$/.test(newValue)) {
                                    setMobile(newValue);
                                }
                            }}
                            inputProps={{ maxLength: 10 }}
                        />

                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Department"
                                variant="outlined"
                                size="small"
                                select
                                fullWidth
                                required
                                value={department}
                                onChange={(e) => handleDepartmentChange(e)}
                            >
                                {departmentsList?.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Sub-Department"
                                variant="outlined"
                                size="small"
                                select
                                fullWidth
                                required
                                value={subDepartment}
                                onChange={(e) => setSubDepartment(e.target.value)}
                            >
                                {subDepartmentsList?.map((subDepartment) => (
                                    <MenuItem key={subDepartment._id} value={subDepartment._id}>
                                        {subDepartment.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-3 m-2 mb-4 w-full">
                    <h2 className="font-medium">Tab Access</h2>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Tab Name</div>
                        <div className="font-medium">Read</div>
                        <div className="font-medium">Write</div>
                        <div className="font-medium">None</div>

                        {tabAccess.map((tab, index) => (
                            <Fragment key={index}>
                                <div>{tab.tab}</div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="read" control={<Radio />} label="Read" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="write" control={<Radio />} label="Write" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="none" control={<Radio />} label="None" />
                                    </RadioGroup>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={16} className="text-white" />
                        ) : ("Submit")}

                    </button>
                </div>

            </form>
        </>
    );
};

export default AddDepartmentUser;
