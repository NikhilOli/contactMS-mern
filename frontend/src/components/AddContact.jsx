import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { RiPhoneLine  } from "react-icons/ri";
import { FaUserPlus, FaRegAddressBook  } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";


const AddContact = () => {
  const navigate = useNavigate()
  const [contactData, setContactData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value
    });
  };


  axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.username || !contactData.email || !contactData.phone || !contactData.address) {
      console.log('Please fill in all the fields.');
      return;
    }
    const token = localStorage.getItem('token'); 
        if (!token) {
          console.log("Token not found. Redirecting to login page");
          return;
        }
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/dashboard/add-contact`, {
      username: contactData.username,
      email: contactData.email,
      phone: contactData.phone,
      address: contactData.address
    }, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    if (res.status === 201) {
      toast.success('New Contact creation successful!', {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/dashboard/contacts")
    } else {
      toast.error(res.data.message || 'New Contact creation unsuccessful!', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }


  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <div className="flex items-center">
            <FaUserPlus size={18} className="mr-2" />
            <input
              type="text"
              id="username"
              name="username"
              value={contactData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter username"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <div className="flex items-center">
            <MdOutlineAlternateEmail size={18} className="mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <div className="flex items-center">
            <RiPhoneLine size={18} className="mr-2" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <div className="flex items-center">
            <FaRegAddressBook size={18} className="mr-2" />
            <textarea
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              placeholder="Enter address"
              required
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
