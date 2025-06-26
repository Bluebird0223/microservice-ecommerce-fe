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

const Subcategory = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [subcategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [permission, setPermission] = useState('')

    const fetchSubCategories = async () => {
        setLoading(true);
        try {
            const response = await adminCommunication.getAllSubCategory();
            if (response?.data?.success) {
                setSubCategories(response?.data?.subcategory);
            } else {
                enqueueSnackbar("Failed to fetch sub categories.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error fetching sub categories: " + err.message, { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPermission(checkDeptTabAccess('sub-category'))

        fetchSubCategories();
    }, [enqueueSnackbar]);



    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await adminCommunication.updateSubCategoryStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Subcategory status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setSubCategories((prevSubCategories) =>
                    prevSubCategories.map((subcategory) =>
                        subcategory._id === id ? { ...subcategory, isActive: newStatus } : subcategory
                    )
                );
            } else {
                enqueueSnackbar("Failed to update subcategory status.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error updating subcategory status: " + err.message, { variant: "error" });
        }
    };


    const columns = [
        {
            field: "subcategory",
            headerName: "Sub Category Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category Name",
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
                renderCell: (params) => (
                    <div>
                        <Actions editRoute={"subcategory"} id={params.row.id} />
                    </div>
                ),
            },
        ] : [])


    ];


    const rows = subcategories.map((item) => ({
        id: item._id || item.id,
        subcategory: item.name || 'Unnamed sub category',
        category: item?.category?.name || 'No Category',
        isActive: item.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Subcategories | Mahahandloom" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Sub Categories</h1>
                {permission?.permission !== 'read' && (
                    <Link to="/admin/new_subcategory" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                        New Subcategory
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

export default Subcategory;

