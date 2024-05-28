import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';


const MySwal = withReactContent(Swal)

const Contacts = () => {

  const [contacts, setContacts] = useState([]);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (!token) {
            console.log("Token not found. Redirecting to login page");
            return;
        }
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/dashboard/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${token.split('=')[1]}` 
          }
        })
        .then((res) => {
          if (res.status === 200) {
            setContacts(res.data.contacts);
            MySwal.fire({
              title: "Deleted!",
              text: "Your contact has been deleted.",
              icon: "success"
            });
          } else {
            console.error("Unexpected status code:", res.status);
          }
        })
        .catch(error => {
          console.error("Error deleting contact:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
          }
        });
      }
    });
  }
  

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FiEdit size={18} />
            </Link>
          </button>
          <button className="text-red-500 hover:text-red-700">
            <RiDeleteBin5Line size={18} onClick={() => deleteRecord(row._id)} />
          </button>
        </>
      ),
      sortable: false,
    },
  ];


  axios.defaults.withCredentials = true
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.log("Token not found. Redirecting to login page");
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/contacts`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setContacts(res.data.contacts);
        } else {
          console.error("Unexpected status code:", res.status);
        }
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });
  }, []);   


  return (
    <div className="py-8 px-4">
    <h1 className="text-2xl font-bold mb-4">Contacts</h1>
    <div className="overflow-x-auto">
      <DataTable
        columns={columns}
        data={contacts}
        noHeader
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationComponentOptions={{
          rowsPerPageText: 'Rows per page:',
        }}
        striped
        highlightOnHover
        className="border border-gray-200 rounded-lg shadow-md"
      />
      {contacts.length === 0 ? (
      <div className="flex items-center justify-center bg-gray-800 text-white py-4 px-6 mt-4 rounded-lg shadow-md">
        No contacts found
      </div>
    ) : (
      <></>
    )}
    </div>
  </div>
  );
}

export default Contacts;
