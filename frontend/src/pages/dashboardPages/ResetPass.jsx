import React, { useState } from "react";
import BASE_URL from "../../config/Api_base";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import '../../css/ResetPassword.css'


const ResetPassword = () => {
  
const nav = useNavigate();

  const handleSubmit=async()=>{
    let id = localStorage.getItem("custId")
    

    try {

      let api = `${BASE_URL}/customer/resetpass`;
    let response = await axios.post(api, {custId:id})
    console.log(response.data.message);
    
    toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
    
                // nav("/login")

    } catch (error) {
     console.log(error);
      
    }
    
  }

  return (
    <>
    <h2 className="resetpass">Looks like you want to reset your password!</h2>
    <h3>Password Reset:</h3> <button className="passReset" onClick={handleSubmit}>Click Here!</button>
    <h4>Reset Your Password Via Email</h4>
    </>
  );
};

export default ResetPassword;
