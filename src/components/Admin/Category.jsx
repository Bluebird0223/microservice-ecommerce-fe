import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import defaultImage from '../../assets/images/blank_img.jpeg';
import Switch from '@mui/material/Switch';
import Actions from './Actions';
import { checkDeptTabAccess } from '../../utils/checkDeptTabAccess';

const Category = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [permission, setPermission] = useState('')

    useEffect(() => {
        setPermission(checkDeptTabAccess('category'))

        const fetchCategories = async () => {
            try {
                const response = await adminCommunication.getAllCategory();
                if (response?.data?.success) {
                    setCategories(response?.data?.category);
                } else {
                    enqueueSnackbar("Failed to fetch categories.", { variant: "error" });
                }
            } catch (err) {
                enqueueSnackbar("Error fetching categories: " + err.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [enqueueSnackbar]);

    const handleStatusChange = async (id, newStatus) => {
        try {

            const response = await adminCommunication.updateCategoryStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Category status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setCategories((prevSubCategories) =>
                    prevSubCategories.map((subcategory) =>
                        subcategory._id === id ? { ...subcategory, isActive: newStatus } : subcategory
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
            field: "categoryimage",
            headerName: "Category Image",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params.row.categoryimage || defaultImage}
                    alt={params.row.category}
                    style={{ width: '100px', height: 'auto' }}
                />
            ),
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
            }
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
                        <Actions editRoute={"category"} id={params.row.id} />
                    );
                },
            }
        ] : []),
    ];
    const rows = categories.map((item) => ({
        id: item._id || item.id,
        categoryimage: item.image?.[0]?.url || defaultImage,
        category: item.name || 'Unnamed Category',
        isActive: item.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Categories | Mahahandloom" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Categories</h1>
                {permission?.permission !== 'read' && (
                    <Link to="/admin/new_category" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                        New Category
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

export default Category;







