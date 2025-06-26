import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { adminCommunication } from '../../service/adminCommunication';
import { CircularProgress, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const AddCoupon = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

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

    const newCouponSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)

        const newCoupon = {
            title,
            code,
            value,
            type,
            totalCartAmount,
            validity: {
                from: validityFrom ? validityFrom.format('YYYY-MM-DD') : '',
                till: validityTill ? validityTill.format('YYYY-MM-DD') : '',
            }
        };
        try {
            const serverResponse = await adminCommunication.createCoupon(newCoupon);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Coupon Created Successfully", { variant: "success" });
                navigate("/admin/Coupons");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        } finally {
            setLoading(false)
        }

    };


    return (
        <>
            <MetaData title="Admin: New Coupon | Mahahandloom" />
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Coupon</h2>

                <form onSubmit={newCouponSubmitHandler} className="p-5 sm:p-10">
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
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Validity From"
                                    selected={validity.from}
                                    onChange={date => { setValidityFrom(date) }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Validity Till"
                                    selected={validity.till}
                                    onChange={date => { setValidityTill(date) }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>

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

export default AddCoupon;
