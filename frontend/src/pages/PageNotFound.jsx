import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">404 - Page Not Found</h1>
            <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Go back to Home</Link>
        </div>
    );
}

export default PageNotFound;
