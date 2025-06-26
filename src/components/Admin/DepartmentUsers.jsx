import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import Switch from '@mui/material/Switch';
import Actions from './Actions';

const DepartmentUsers = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [departmentUsers, setDepartmentUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await adminCommunication.getAllDepartmentUsers();
                if (response?.data?.success) {
                    setDepartmentUsers(response?.data?.deptUsers);
                } else {
                    enqueueSnackbar("Failed to fetch department.", { variant: "error" });
                }
            } catch (err) {
                enqueueSnackbar("Error fetching department: " + err.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [enqueueSnackbar]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await adminCommunication.updateDepartmentUserStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Department status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setDepartmentUsers((prevDepartments) =>
                    prevDepartments.map((department) =>
                        department._id === id ? { ...department, isActive: newStatus } : department
                    )
                );
            } else {
                enqueueSnackbar("Failed to update category status.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error updating category status: " + err.message, { variant: "error" });
        }
    };


    const deleteDepartmentHandler = async (id) => {
        // try {
        //     const response = await adminCommunication.deleteCategory(id);
        //     if (response?.data?.success) {
        //         enqueueSnackbar('category deleted', { variant: "success" });
        //     } else {
        //         enqueueSnackbar("Failed to delete.", { variant: "error" });
        //     }
        // } catch (error) {
        //     enqueueSnackbar("Error updating subcategory status: " + error.message, { variant: "error" });
        // }
        // dispatch(deleteProduct(id));
        // if (window.confirm('Are you sure you want to delete this category?')) {
        //     enqueueSnackbar("Category Deleted", { variant: "success" });
        // }
    };


    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "userId",
            headerName: "User ID",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "departmentId",
            headerName: "Department ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 0.1,
            align: "center",
            headerAlign: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Switch
                        checked={params.row.isActive}
                        onChange={(e) => handleStatusChange(params.row.id, e.target.checked)}
                        inputProps={{ 'aria-label': 'Status Toggle' }}
                    />
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                        editRoute={"department-users"}
                        deleteHandler={deleteDepartmentHandler}
                        id={params.row.id}
                    />
                );
            },
        },
    ];

    const rows = departmentUsers.map((item) => ({
        id: item._id,
        name: item.name,
        userId: item.userId || 'Unknown User',
        email: item.email || 'No Email',
        departmentId: item.departmentId || 'No DepartmentId',
        isActive: item.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Department User | Mahahandloom" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Department Users</h1>
                <Link to="/admin/new_department_users" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                    New Department User
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default DepartmentUsers;

