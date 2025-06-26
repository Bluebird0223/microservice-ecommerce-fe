import TextField from '@mui/material/TextField';
import { Fragment, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';

const UpdateDepartmentUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [department, setDepartment] = useState("");
    const [subDepartment, setSubDepartment] = useState("");
    const [departmentsList, setDepartmentsList] = useState([]);
    const [subDepartmentsList, setSubDepartmentsList] = useState([]);
    const [tabAccess, setTabAccess] = useState([
        { tab: 'Dashboard', permission: 'none' },
        { tab: 'Orders', permission: 'none' },
        { tab: 'Products', permission: 'none' },
        { tab: 'Category', permission: 'none' },
        { tab: 'Sub-category', permission: 'none' },
        { tab: 'Users', permission: 'none' },
        { tab: 'Reviews', permission: 'none' },
        { tab: 'Departments', permission: 'none' },
        { tab: 'Sub-departments', permission: 'none' },
        { tab: 'Department Users', permission: 'none' },
        { tab: 'coupon', permission: 'none' },
    ]);

    const handleTabPermissionChange = (index, event) => {
        const newTabAccess = [...tabAccess];
        newTabAccess[index].permission = event.target.value;
        setTabAccess(newTabAccess);
    };


    const newUserSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            
            formData.set("userId",params.id)
            formData.set("name", name);
            formData.set("email", email);
            formData.set("mobile", mobile);
            formData.set("departmentId", department);
            formData.set("subdepartmentId", subDepartment);
            formData.set("tabAccess", JSON.stringify(tabAccess));

            const serverResponse = await adminCommunication.updateDepartmentUser(formData);
            if (serverResponse?.data?.success) {
                navigate("/admin/department-users");
            } else {
                enqueueSnackbar("Failed to Update department user", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
        setLoading(false)
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
        fetchSubDepartment(selectedDepartment);
    };
    const handleSubDepartmentChange = (e) => {
        const selectSubDepartment = e.target.value
        setSubDepartment(selectSubDepartment)
    }

    const userId = params.id
    const fetchDepartmentUserDetails = async () => {
        try {
            const response = await adminCommunication.departmentUserDetails(userId);
            if (response?.data?.success) {
                setName(response?.data?.departmentUser?.name);
                setEmail(response?.data?.departmentUser?.email);
                setMobile(response?.data?.departmentUser?.mobile);
                setDepartment(response?.data?.departmentUser?.departmentId?._id);
                setTabAccess(response?.data?.departmentUser?.tabAccess);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
        }
    }
    

    useEffect(() => {

        fetchDepartmentUserDetails();
        fetchDepartments();
    }, [userId, enqueueSnackbar]);



    return (
        <>
            <MetaData title="Admin: Update Department User | Flipkart" />

            <Link to="/admin/department-users" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <form onSubmit={newUserSubmitHandler} encType="multipart/form-data" className="justify-center sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <h1 className="text-lg font-medium uppercase">Update Department User</h1>
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
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                                onChange={handleDepartmentChange}
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
                                onChange={handleSubDepartmentChange}
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
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>

            </form>
        </>
    );
};

export default UpdateDepartmentUser;
