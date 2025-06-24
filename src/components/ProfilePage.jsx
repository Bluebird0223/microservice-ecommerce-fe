// src/components/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you have react-router-dom for navigation

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleEdit = (userId) => {
    navigate(`/profile/edit`, { state: { userId } });
  };

  // Dummy user data
  const user = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2023",
    profilePicture: "https://placehold.co/400x400/E6E6FA/000000?text=Jond Doe",
    bio: "Passionate about technology and sustainable living. Always looking for new adventures and learning opportunities.",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "USA"
    },
    recentOrders: [
      { id: 'ORD001', date: '2024-05-15', total: 75.50, status: 'Delivered' },
      { id: 'ORD002', date: '2024-06-01', total: 25.00, status: 'Processing' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-500 mb-4 bg-gray-700 rounded-2xl p-2 hover:shadow-md transition-shadow duration-200"
      >
        Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        {/* Left Section: Profile Picture and Basic Info */}
        <div className="md:w-1/3 p-6 bg-gray-800 text-white flex flex-col items-center justify-center relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4 shadow-lg">
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-300 text-sm">{user.email}</p>
          <p className="text-gray-400 text-xs mt-2">Member since: {user.memberSince}</p>

          {/* Optional: Edit Profile Button */}
          <button onClick={() => handleEdit(user.id)} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Edit Profile
          </button>
        </div>

        {/* Right Section: Details */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">User Profile</h1>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-700 leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
            <p className="text-gray-700">
              {user.address.street}<br />
              {user.address.city}, {user.address.state} {user.address.zip}<br />
              {user.address.country}
            </p>
          </div>

          {/* Recent Orders Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Orders</h3>
            {user.recentOrders.length > 0 ? (
              <ul className="space-y-3">
                {user.recentOrders.map(order => (
                  <li key={order.id} className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">Order ID: <span className="text-blue-600">{order.id}</span></p>
                      <p className="text-sm text-gray-600">Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">₹{order.total.toFixed(2)}</p>
                      <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No recent orders found.</p>
            )}
          </div>

          {/* Optional: Additional sections like Settings, Payment Methods, etc. */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg mr-4 transition duration-200">
              Change Password
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;