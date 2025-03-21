import React, { useEffect, useState } from 'react'
import BASE_URL from '../../config/Api_base';
import axios from 'axios';
import '../../css/AccInfo.css'

const AccInfo = () => {

  const [mydata, setMydata] = useState([]);


  const id = localStorage.getItem("custId")

  const loadData = async()=>{
    let api = `${BASE_URL}/customer/accInfo`;

    try {

      const response = await axios.post(api, {custid:id})  
      setMydata(response.data)
      
      
    } catch (error)
    {
      console.log(error);
      
    }
  }

  


 useEffect(()=>{
  loadData();
 },[])

if (!mydata) {
    return <div className="loading">Loading account details...</div>;
  }
 

  return (
    <>
    <div className="account-page">
      <h2 className="account-title">Account Information</h2>
      <div className="account-info">
        <p><span>Account Holder Name:</span> {mydata.firstname} {mydata.lastname}</p>
        <p><span>Email:</span> {mydata.email}</p>
        <p><span>Mobile No.:</span> {mydata.mobile}</p>
        <p><span>Address:</span> {mydata.address}</p>
        <p><span>City:</span> {mydata.city}</p>
      </div>
    </div> 
    </>
  )
}

export default AccInfo
