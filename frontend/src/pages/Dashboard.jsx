import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
const nav = useNavigate()
    
const logout=()=>{
        localStorage.clear();
        nav("/login")
    }


    useEffect(()=>{
        if(!localStorage.getItem("token"))
        {
            nav("/login")
        }
    },[])
  return (
    <>
      <div style={{backgroundColor:"teal", height:"100px"}}>
    <h1>My DashBoard</h1>
    <h3>Welcome : {localStorage.getItem("name")}</h3>
    <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default Dashboard
