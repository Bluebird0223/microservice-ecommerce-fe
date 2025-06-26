import React, { useState } from 'react';
import { adminCommunication } from '../service/adminCommunication';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'cookies-next';

const tokenName = import.meta.env.VITE_APP_ADMIN_TOKENNAME;
const adminDetails = import.meta.env.VITE_APP_ADMINDETAILS;

// You would typically import icons like this if using lucide-react directly
// For this self-contained example, we'll use inline SVG for simplicity.
// import { User, Lock, LogIn } from 'lucide-react';

// Inline SVG for User icon
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// Inline SVG for Lock icon
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

// Inline SVG for LogIn icon
const LogInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
);


const LoginPage = () => {
    // State variables for username, password, and potential error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Clear any previous errors
        setError('');
        setLoading(true); // Set loading to true when form is submitted

        console.log('Attempting to log in with:', { username, password });
        const dataToSend = {
            userName: username,
            password
        }
        try {
            const response = await adminCommunication.login(dataToSend);
            // enqueueSnackbar("Login Successful", { variant: "success" });
            console.log(response?.data?.userDetails)
            if (response?.data?.userDetails?.userType === "admin") {
                setCookie(tokenName, response?.data?.token);
                setCookie(adminDetails, response?.data?.userDetails);
                navigate("/admin/dashboard");
            } else {
                // add user data in  the user state of redux
                // dispatch(loginSuccess(serverResponse?.data?.user));
                // let userDetails = {
                //     id: serverResponse?.data?.user?._id,
                //     avatar: serverResponse?.data?.user?.avatar,
                //     email: serverResponse?.data?.user?.email,
                //     gender: serverResponse?.data?.user?.gender,
                //     name: serverResponse?.data?.user?.name,
                //     role: serverResponse?.data?.user?.role,
                // };

                // setCookie(process.env.REACT_APP_USERDETAILS, userDetails);
                // setCookie(
                //     process.env.REACT_APP_TOKENNAME,
                //     serverResponse?.data?.token
                // );
                navigate("/");
            }
        } catch (error) {
            console.log(error)
            // dispatch(loginFail(error?.message));
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 font-sans">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Username
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon /> {/* User icon */}
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter your username"
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon /> {/* Lock icon */}
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging In...
                            </div>
                        ) : (
                            <>
                                <LogInIcon />
                                Log In
                            </>
                        )}
                    </button>
                </form>

                {/* Optional: Forgot password / Sign up links */}
                <div className="mt-6 text-center text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
};


export default LoginPage
