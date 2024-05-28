import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { setUser } = useContext(UserContext)
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();

  useEffect(() => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50", 
      cancelButtonColor: "#F44336",
      confirmButtonText: "Yes, I want!"
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
        setUser(null);
        MySwal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success"
        }).then(() => {
          navigate("/");
        });
      } else {
        navigate("/dashboard/profile");
      }
    });
  }, [MySwal, navigate, setUser]);

  return null; 
};


export default Logout
