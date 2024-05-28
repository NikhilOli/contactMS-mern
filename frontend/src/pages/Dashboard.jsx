import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { CgLogOut, CgProfile } from "react-icons/cg";
import { RiContactsBook3Fill, RiContactsFill } from "react-icons/ri";
import { UserContext } from '../App';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token not found. Redirecting to login page");
            return;
        }
        setLoading(false)
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <div className='flex h-[90vh]'>
            <div className="sidebar w-[20%] bg-gray-800 text-white">
                <h2 className="text-2xl font-bold p-4 my-2">Dashboard</h2>
                <div className="space-y-2 my-4 flex flex-col gap-y-2">
                    <div className='flex items-center hover:bg-gray-700 text-lg  cursor-pointer'>
                        <CgProfile size={24} className='ml-6' />
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) => `p-2 ${isActive ? "text-rose-400" : "text-white"}`}
                        >Profile</NavLink>
                    </div>
                    <div className='flex items-center  hover:bg-gray-700 text-lg cursor-pointer'>
                        <RiContactsFill size={24} className='ml-6' />
                        <NavLink
                            to="/dashboard/add-contact"
                            className={({ isActive }) => `p-2 ${isActive ? "text-rose-400" : "text-white"}`}
                        >  Add Contact</NavLink>
                    </div>
                    <div className='flex items-center hover:bg-gray-700 text-lg  cursor-pointer'>
                        <RiContactsBook3Fill size={24} className='ml-6' />
                        <NavLink
                            to="/dashboard/contacts"
                            className={({ isActive }) => `p-2 ${isActive ? "text-rose-400" : "text-white"}`}
                        >Contacts</NavLink>
                    </div>
                    <div className='flex items-center hover:bg-gray-700 text-lg  cursor-pointer'>
                        <CgLogOut size={24} className='ml-6' />
                        <NavLink
                            to="/logout"
                            className={({ isActive }) => `p-2 ${isActive ? "text-rose-400" : "text-white"}`}
                        >Logout</NavLink>
                    </div>

                </div>
            </div>
            <div className="content w-[80%] bg-gray-200 ">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;
