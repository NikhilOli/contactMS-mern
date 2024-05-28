import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [contactCount, setContactCount] = useState(0);
  axios.defaults.withCredentials = true

  useEffect(() => {
    const fetchContactCount = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          console.log("Token not found. Redirecting to login page");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/contacts`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setContactCount(response.data.contactCount);
      } catch (error) {
        console.error('Error fetching contact count:', error);
      }
    };

    fetchContactCount();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-emerald-300 rounded-full flex justify-center items-center">
          {user && (
            <span className="text-xl font-semibold text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user && user.name}</h2>
          <p className="text-sm text-gray-500">{user && user.email}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">Number of contacts created: {contactCount}</p>
      </div>
    </div>
  );
};

export default Profile;
