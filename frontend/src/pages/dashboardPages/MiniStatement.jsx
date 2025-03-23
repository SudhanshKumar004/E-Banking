import React, { useState } from 'react'
import BASE_URL from '../../config/Api_base'
import axios from 'axios'
import '../../css/Ministatement.css'
import { toast } from 'react-toastify'


const MiniStatement = () => {
    const [fromDate,setFromDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const id = localStorage.getItem("custId");
    const [ministatement,setMinistatement] = useState([]);


    const handleSubmit = async () =>{
        let api = `${BASE_URL}/customer/ministatement`

        try {
            let response = await axios.post(api, { custid: id, fromDate:fromDate, endDate:endDate });
            setMinistatement(response.data);
            console.log(response.data);
        } 
        
        catch (error) {
         console.log(error.response.data);
         toast.error(error.response.data, {
               position: 'top-center',
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               theme: 'dark'
         });
        }
    }


    let ans = ministatement.map((key)=>{
        return(
            <>
            <tr>
              <td>{new Date(key.transactionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</td>
              <td>{key.description}</td>
              <td style={{color:"red"}}>{key.status === "debit" ? key.amount :""}</td>
              <td style={{color:"green"}}>{key.status === "credit" ? key.amount :""}</td>
            </tr>
            </>
        )
    })
  return (
    <>
    <h1 className="mini-head">
        Mini Statement
    </h1>
      <div className="ministate">
        <div className="dates">
            <h1 className="begin-date">From :<input type="date" value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}} /></h1>
            <h1 className="begin-date">To :<input type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} /></h1>
            </div>
            <button onClick={handleSubmit} className='ministate-button'>Get Statement</button>
            <hr />

            <table className="statement-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default MiniStatement
