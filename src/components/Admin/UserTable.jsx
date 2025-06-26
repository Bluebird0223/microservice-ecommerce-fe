import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import { checkDeptTabAccess } from '../../utils/checkDeptTabAccess';
import { Switch } from '@mui/material';

const UserTable = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState([]);
    const [permission, setPermission] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [loading, setLoading] = useState(false)

    let error = null

    useEffect(() => {

        setPermission(checkDeptTabAccess('users'))

        const fetchUsers = async () => {
            try {
                const response = await adminCommunication.getAllUsers();
                if (response?.data?.success) {
                    setUsers(response?.data?.users);
                } else {
                    enqueueSnackbar("Failed to fetch categories.", { variant: "error" });
                }
            } catch (error) {
                enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [enqueueSnackbar]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await adminCommunication.updateUserStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`User status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === id ? { ...user, isActive: newStatus } : user
                    )
                );
            } else {
                enqueueSnackbar("Failed to update user status.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error updating user status: " + err.message, { variant: "error" });
        }
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            {/* Display avatar if available */}
                            {params.row.avatar ? (
                                <img draggable="false" src={params.row.avatar} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-white">{params.row.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.2,
        },
        {
            field: "gender",
            headerName: "Gender",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.role === "admin" ? (
                                <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800 capitalize">{params.row.role}</span>
                            ) : (
                                <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize">{params.row.role}</span>
                            )
                        }
                    </>
                )
            },
        },
        {
            field: "registeredOn",
            headerName: "Registered On",
            type: "date",
            minWidth: 150,
            flex: 0.2,
        },
        ...(permission?.permission !== 'read' ? [
            {
                field: "status",
                headerName: "Status",
                minWidth: 100,
                flex: 1,
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
        ] : []),

    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            // avatar: item.avatar.url,
            email: item.email,
            gender: item.gender.toUpperCase(),
            role: item.role,
            isActive: item.isActive,
            registeredOn: new Date(item.createdAt).toISOString().substring(0, 10),
        });
    });

    return (
        <>
            <MetaData title="Admin Users | Flipkart" />

            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase">users</h1>
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

export default UserTable;