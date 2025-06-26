import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import { CircularProgress, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { formatDate } from '../../utils/dateFormatter';

const UpdateCoupon = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [totalCartAmount, setTotalCartAmount] = useState('');
    const [validity, setValidity] = useState({ from: '', till: '' });
    const [validityFrom, setValidityFrom] = useState('')
    const [validityTill, setValidityTill] = useState('')

    const valueOrPrices = [
        { value: 'percentage', name: 'Percentage' },
        { value: 'price', name: 'Price' },
    ];

    const couponId = params.id
    const fetchCouponData = async () => {
        try {
            const response = await adminCommunication.getCouponById(couponId);
            const coupon = response?.data?.coupon;
            if (coupon) {
                setTitle(coupon.title);
                setCode(coupon.code);
                setValue(coupon.value);
                setType(coupon.type);
                setTotalCartAmount(coupon.totalCartAmount);
                setValidityFrom(formatDate(coupon?.validity?.from))
                setValidityTill(formatDate(coupon?.validity?.till))
            } else {
                enqueueSnackbar("Coupon not found", { variant: "error" });
                navigate("/admin/coupons");
            }
            setLoading(false)
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchCouponData();
    }, [enqueueSnackbar, params?.id]);


    const updateSubmitHandler = async (e) => {
        e.preventDefault();

        const updatedCoupon = {
            title,
            code,
            value,
            type,
            totalCartAmount,
            validity: {
                from: validityFrom ? dayjs(validityFrom).format('YYYY-MM-DD') : '',
                till: validityTill ? dayjs(validityTill).format('YYYY-MM-DD') : '',
            }
        };
        try {
            setLoading(true)
            const serverResponse = await adminCommunication.updateCoupon(couponId, updatedCoupon);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Coupon Updated Successfully", { variant: "success" });
                navigate("/admin/coupons");
            } else {
                enqueueSnackbar("Failed to update coupon", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }
        setLoading(false)


    };


    return (
        <>
            <MetaData title="Admin: Update Coupon | Mahahandloom" />

            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Coupon</h2>

                <form onSubmit={updateSubmitHandler} className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Title"
                                variant="outlined"
                                size="small"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Code"
                                variant="outlined"
                                size="small"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Value"
                                variant="outlined"
                                size="small"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Type"
                                select
                                variant="outlined"
                                size="small"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                fullWidth
                            >
                                {valueOrPrices.map((valueOrPrice) => (
                                    <MenuItem key={valueOrPrice.value} value={valueOrPrice.value}>
                                        {valueOrPrice.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Minimum Cart Amount"
                                variant="outlined"
                                size="small"
                                required
                                value={totalCartAmount}
                                onChange={(e) => setTotalCartAmount(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <div>
                                <label className="text-sm font-medium text-gray-700">Validity From</label>
                                <input
                                    type="date"
                                    value={validityFrom}
                                    onChange={(e) => { setValidityFrom(e.target.value) }}
                                    className="w-full px-3 py-3 text-base border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Validity Till</label>
                                <input
                                    type="date"
                                    value={validityTill}
                                    onChange={(e) => { setValidityTill(e.target.value) }}
                                    className="w-full px-3 py-3 text-base border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                            disabled={loading}
                        >{loading ? (
                            <CircularProgress size={16} className="text-white" />
                        ) : ("Submit")}</button>
                        <Link to="/admin/coupons" className="w-full text-center py-3 bg-gray-300 rounded-sm font-medium">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateCoupon;
