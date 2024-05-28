// Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(UserContext)

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-xl font-bold">Contact Management System</Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link to="/" className="mr-4 hover:text-gray-300">Home</Link>
                        <Link to="/dashboard/contacts" className="mr-4 hover:text-gray-300">About</Link>
                        <Link to="/dashboard/contacts" className="hover:text-gray-300">Contacts</Link>
                        {
                            user ? <>
                                <Link to="#" className="ml-4 bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100">{user.name}</Link>
                                <Link to="/logout" className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">Logout</Link>
                                </>
                                :
                                <>
                                    <Link to="/register" className="ml-4 bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100">Register</Link>
                                    <Link to="/login" className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">Login</Link>
                                </>
                        }
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="mt-4 md:hidden">
                        <a href="#" className="block text-white mb-2">Home</a>
                        <a href="#" className="block text-white mb-2">About</a>
                        <a href="#" className="block text-white">Contact</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
