import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.name || !user.email || !user.password ) {
            console.log('Please fill in all the fields.');
            return;
        }
        if (user.password.length < 6) {
            setErrorMessage('Password should be at least 6 characters long.');
            return;
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                name: user.name,
                email: user.email,
                password: user.password
            });
            if (res.status === 201) {
                toast('Registration successful!',
                    {
                        icon: '✅',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
                navigate("/login");
            } else {
                console.log('Registration failed:', res.data.message);
                setErrorMessage(res.data.message);
            }
        } catch (error) {
            console.log("Error registering user in frontend", error);
            setErrorMessage('Error registering user');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-gray-700 p-6 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="text" value={user.name} required className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-600 border border-gray-600 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" value={user.email}  autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-600 border border-gray-600 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" value={user.password}  autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-600 border border-gray-600 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-center">{errorMessage}</div>
                    )}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">Already registered? <Link to="/login" className="font-medium text-indigo-300 hover:text-indigo-200">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
