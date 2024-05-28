import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-gray-700 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome to Contact Management System</h2>
                <p className="text-lg text-gray-300 mb-8">Manage your contacts with ease. Login or register to get started.</p>
                <div className="flex justify-center space-x-4">
                    <Link to="/login" className="text-indigo-500 hover:text-indigo-700 font-semibold">Login</Link>
                    <span className="text-gray-500">or</span>
                    <Link to="/register" className="text-indigo-500 hover:text-indigo-700 font-semibold">Register</Link>
                </div>
                <div className="mt-8 text-sm text-gray-300 font-bold">
                    Don't have an account? <Link to="/register" className="text-indigo-500 hover:text-indigo-700 font-semibold">Sign up here</Link>.
                </div>
            </div>
        </div>
    );
};

export default Home;
