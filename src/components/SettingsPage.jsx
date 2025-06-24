// src/components/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  // Dummy initial settings data. In a real app, this would be fetched from an API
  // or from a user's local storage/global state.
  const initialSettings = {
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
    privacyProfilePublic: false, // e.g., if profile is visible to others
    defaultCurrency: 'INR',
    language: 'English',
    // Add more settings as needed
  };

  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input changes (for text, select, and checkboxes)
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Simulate saving settings to a backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    console.log("Saving settings:", settings);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSaving(false);
    setSaveSuccess(true);
    // Optionally, you might navigate back or show a persistent success message
    // navigate('/profile');
  };

  // Effect to clear success message after a few seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-2 bg-blue-500/15 backdrop-blur-md border border-blue-500/40 text-white p-2 shadow-lg rounded-4xl z-50 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">App Settings</h1>

        {saveSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Settings Saved!</strong>
            <span className="block sm:inline ml-2">Your preferences have been updated.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">General</h2>
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <label htmlFor="darkMode" className="text-gray-700 text-lg cursor-pointer">Dark Mode</label>
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>

              {/* Language Select */}
              <div>
                <label htmlFor="language" className="block text-gray-700 text-lg font-medium mb-2">Language</label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              {/* Default Currency Select */}
              <div>
                <label htmlFor="defaultCurrency" className="block text-gray-700 text-lg font-medium mb-2">Default Currency</label>
                <select
                  id="defaultCurrency"
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                >
                  <option value="INR">INR (Indian Rupee)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="emailNotifications" className="text-gray-700 text-lg cursor-pointer">Email Notifications</label>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="smsNotifications" className="text-gray-700 text-lg cursor-pointer">SMS Notifications</label>
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="newsletter" className="text-gray-700 text-lg cursor-pointer">Subscribe to Newsletter</label>
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={settings.newsletter}
                  onChange={handleChange}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="privacyProfilePublic" className="text-gray-700 text-lg cursor-pointer">Make Profile Public</label>
                <input
                  type="checkbox"
                  id="privacyProfilePublic"
                  name="privacyProfilePublic"
                  checked={settings.privacyProfilePublic}
                  onChange={handleChange}
                  className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </section>


          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)} // Go back without saving
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
                "Save Settings"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;