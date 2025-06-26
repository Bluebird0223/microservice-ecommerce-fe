import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import { checkDeptTabAccess } from '../../utils/checkDeptTabAccess';

const ReviewsTable = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");
    const [permission, setPermission] = useState('')

    let [reviews, setReviews] = useState([])
    let loading = false;

    const getAllReviews = async () => {
        try {
            const response = await adminCommunication.getAllReviewsForAdmin();
            if (response?.data?.success) {
                setReviews(response?.data?.reviews);
            } else {
                enqueueSnackbar("Failed to fetch reviews.", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Error fetching reviews: " + error.message, { variant: "error" });
        }
    }

    const deleteReviewHandler = async (id, productId) => {
        try {
            const response = await adminCommunication.deleteReview(id, productId);
            if (response?.data?.success) {
                enqueueSnackbar("Review Deleted.", { variant: "success" });
            } else {
                enqueueSnackbar("Failed to fetch reviews.", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Error fetching reviews: " + error.message, { variant: "error" });
        }
    }


    useEffect(() => {
        setPermission(checkDeptTabAccess('reviews'))
        getAllReviews()
    }, [enqueueSnackbar]);

    const columns = [
        {
            field: "productId",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 200,
            flex: 0.3,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 200,
            flex: 0.5,
        },
        ...(permission?.permission !== 'read' ? [
            {
                field: "actions",
                headerName: "Actions",
                minWidth: 150,
                flex: 0.3,
                type: "number",
                sortable: false,
                renderCell: (params) => {
                    return (
                        <Actions editRoute={"review"} deleteHandler={() => deleteReviewHandler(params.row.id, params.row.productId)} id={params.row.id} />
                    );
                },
            },
        ] : [])

    ];

    const rows = [];

    reviews && reviews.forEach((rev) => {
        rows.push({
            productId: rev.productId,
            id: rev._id,
            rating: rev.rating,
            comment: rev.comment,
            user: rev.name,
        });
    });

    return (
        <>
            <MetaData title="Admin Reviews | Flipkart" />

            {loading && <BackdropLoader />}
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <h1 className="text-lg font-medium uppercase">reviews</h1>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} className="outline-none border-0 rounded p-2 w-full shadow hover:shadow-lg" />
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{ boxShadow: 0, border: 0, }}
                />
            </div>
        </>
    );
};

export default ReviewsTable;