import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import Switch from '@mui/material/Switch';
import Actions from './Actions';
import { checkDeptTabAccess } from '../../utils/checkDeptTabAccess';

const Department = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [permission, setPermission] = useState('')

    useEffect(() => {
        setPermission(checkDeptTabAccess('departments'))
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await adminCommunication.getAllDepartments();
                if (response?.data?.success) {
                    setDepartment(response?.data?.departments);
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
            const response = await adminCommunication.updateSubDepartmentStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Department status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setDepartment((prevDepartments) =>
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


    const columns = [
        {
            field: "departmentId",
            headerName: "Department ID",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "department",
            headerName: "Department Name",
            minWidth: 100,
            flex: 1,
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
        ...(permission?.permission !== 'read' ? [
            {
                field: "actions",
                headerName: "Actions",
                minWidth: 100,
                flex: 1,
                align: "left",
                headerAlign: "left",
                sortable: false,
                renderCell: (params) => {
                    return (
                        <Actions editRoute={"department"} id={params.row.id} />
                    );
                },
            },
        ] : [])

    ];


    const rows = department.map((item) => ({
        id: item._id,
        departmentId: item._id,
        department: item.name || 'Unnamed Department',
        isActive: item.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Department | Mahahandloom" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Department</h1>
                {permission?.permission !== 'read' && (
                    <Link to="/admin/new_department" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                        New Department
                    </Link>
                )}
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

export default Department;

