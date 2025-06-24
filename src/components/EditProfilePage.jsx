// src/components/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const navigate = useNavigate();

    // Dummy user data - In a real app, this would come from an API call
    // or a global state management solution (e.g., Context API, Redux, Zustand).
    const initialUserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Passionate about technology and sustainable living. Always looking for new adventures and learning opportunities.",
        profilePicture: "https://placehold.co/400x400/E6E6FA/000000?text=Jond Doe",
        address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "90210",
            country: "USA"
        }
    };

    // State to hold the editable user data
    const [userData, setUserData] = useState(initialUserData);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setUserData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value
                }
            }));
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Simulate saving data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        // In a real application, you would send userData to your backend API here
        console.log("Saving user data:", userData);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSaving(false);
        setSaveSuccess(true);
        // Optionally navigate back to profile page after successful save
        // navigate('/profile');
    };

    // Effect to clear success message after a few seconds
    useEffect(() => {
        if (saveSuccess) {
            const timer = setTimeout(() => {
                setSaveSuccess(false);
            }, 3000); // Message visible for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [saveSuccess]);


    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="text-gray-500 mb-4 bg-gray-700 rounded-2xl p-2 hover:shadow-md transition-shadow duration-200"
            >
                Back
            </button>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Edit Profile</h1>

                {saveSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">Your profile has been updated.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Profile Picture Section (for display, can add upload functionality) */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 mb-4 shadow-lg">
                            <img
                                src={userData.profilePicture}
                                alt={`${userData.name}'s profile`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* You could add an input type="file" here for image upload */}
                        <p className="text-sm text-gray-600">Profile picture (display only for now)</p>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                value={userData.bio}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                                <input
                                    type="text"
                                    id="address.street"
                                    name="address.street"
                                    value={userData.address.street}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    id="address.city"
                                    name="address.city"
                                    value={userData.address.city}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    id="address.state"
                                    name="address.state"
                                    value={userData.address.state}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="address.zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                <input
                                    type="text"
                                    id="address.zip"
                                    name="address.zip"
                                    value={userData.address.zip}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    id="address.country"
                                    name="address.country"
                                    value={userData.address.country}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')} // Navigate back to profile without saving
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-200"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;