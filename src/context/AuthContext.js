import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

// Firebase Imports (ensure these versions are compatible or use the latest provided by Canvas)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
    getAuth,
    signInAnonymously,
    signInWithCustomToken,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import {
    getFirestore, // Import Firestore if you plan to use it for user data beyond basic auth
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null); // Firestore instance

    useEffect(() => {
        const initFirebase = async () => {
            try {
                // Global variables provided by Canvas environment
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

                const app = initializeApp(firebaseConfig);
                const authInstance = getAuth(app);
                const firestoreInstance = getFirestore(app); // Initialize Firestore

                setFirebaseApp(app);
                setAuth(authInstance);
                setDb(firestoreInstance); // Set Firestore instance

                // Handle initial custom auth token for Canvas environment
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(authInstance, __initial_auth_token);
                    console.log("Signed in with custom token.");
                } else {
                    await signInAnonymously(authInstance);
                    console.log("Signed in anonymously.");
                }

                // Listen for auth state changes
                const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                    setCurrentUser(user);
                    setAuthLoading(false);
                });

                return () => unsubscribe(); // Cleanup subscription
            } catch (error) {
                console.error("Firebase initialization or auth error:", error);
                setAuthLoading(false); // Ensure loading state is false even on error
            }
        };

        initFirebase();
    }, []); // Run only once on mount

    // Firebase Auth methods
    const signInWithGoogle = async () => {
        if (!auth) return;
        setAuthLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // User is automatically set by onAuthStateChanged listener
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error; // Re-throw to be caught by UI component
        } finally {
            setAuthLoading(false);
        }
    };

    const signInWithEmail = async (email, password) => {
        if (!auth) return;
        setAuthLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Sign-In Error:", error);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const signUpWithEmail = async (email, password) => {
        if (!auth) return;
        setAuthLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Sign-Up Error:", error);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const signOutUser = async () => {
        if (!auth) return;
        setAuthLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign-Out Error:", error);
        } finally {
            setAuthLoading(false);
        }
    };

    const value = {
        currentUser,
        authLoading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        auth, // Provide auth instance if needed elsewhere
        db, // Provide firestore instance if needed elsewhere
    };

    return (
        <AuthContext.Provider value={value}>
            {authLoading ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                    Loading authentication...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// --- Auth Modal Component ---
const AuthModal = ({ isOpen, onClose }) => {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [view, setView] = useState('login'); // 'login' or 'signup'

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await signInWithGoogle();
            onClose(); // Close modal on success
        } catch (err) {
            setError(err.message || "Failed to sign in with Google.");
        }
    };

    const handleEmailPasswordAuth = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError("Email and password cannot be empty.");
            return;
        }
        if (view === 'signup' && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            if (view === 'login') {
                await signInWithEmail(email, password);
            } else { // signup
                await signUpWithEmail(email, password);
            }
            onClose(); // Close modal on success
        } catch (err) {
            // Firebase errors often have 'auth/' prefix, strip it for cleaner message
            const errorMessage = err.message.replace('Firebase: Error (auth/', '').replace(').', '');
            setError(errorMessage || "An unexpected error occurred.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    {view === 'login' ? 'Log In' : 'Sign Up'}
                </h2>

                {error && (
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={authLoading}
                    >
                        <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="mr-2" />
                        {authLoading ? 'Signing in...' : `Continue with Google`}
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                required
                                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                            />
                        </div>
                        {view === 'signup' && (
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={authLoading}
                        >
                            {authLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {view === 'login' ? (authLoading ? 'Logging In...' : 'Log In') : (authLoading ? 'Signing Up...' : 'Sign Up')}
                        </button>
                    </form>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    {view === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button onClick={() => setView('signup')} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button onClick={() => setView('login')} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Log In
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};