import React, { useState } from 'react'
import BASE_URL from '../../config/Api_base'
import axios from 'axios'

const MiniStatement = () => {
    const [fromDate,setFromDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const id = localStorage.getItem("custId");


    const handleSubmit = async () =>{
        let api = `${BASE_URL}/customer/ministatement`

        try {
               let response = await axios.post(api, { custid: id, fromdate:fromDate, endDate:endDate });
            console.log(response.data);
            
        } 
        
        catch (error) {
         console.log(error.response.data);
        }
    }
  return (
    <>
      <div className="ministate">
<h1 className="begin-date">From :<input type="date" value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}} /></h1>
<h1 className="begin-date">To :<input type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} /></h1>
<button onClick={handleSubmit}>Get Statement</button>

      </div>
    </>
  )
}

export default MiniStatement
