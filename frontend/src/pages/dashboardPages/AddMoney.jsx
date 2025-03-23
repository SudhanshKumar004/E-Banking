import React, { useState } from 'react'
import BASE_URL from '../../config/Api_base'
import axios from 'axios'
import { toast } from 'react-toastify'
import '../../css/Addmoney.css'



const AddMoney = () => {

  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(false)

  const handleDescription = (e)=>{
    setDescription(e.target.value);
    console.log(description);
    setStatus(true);
  }

  const handleInput = async()=>{
    let api = `${BASE_URL}/customer/moneytransaction`

    try {
      let response = await axios.post(api, {amount:amount, description: status == true ? description:"Add to Cash" , custid:localStorage.getItem("custId"), status:"credit"})
      
      
      toast(response.data.msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      style: {
        background: 'linear-gradient(to right,rgb(4, 18, 13),rgb(7, 67, 67))',
        color: '#fff'
      }
});
setAmount("")

} 
    
    catch (error) {
     toast.error(response.data.msg, {
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


  return (
    <>
      <div className="addmoney-container">
      <div className="addmoney-card">
        <h1 className="addmoney-head">
           Add Money
        </h1>

        <p className="addmoney-para">Securely add money to your account🔒</p>
        <hr style={{color:"white"}} />
        <div className="input-container">
          <label className="addmoney-label">Enter Amount:</label>
          <div className="inputbox">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="addmoney-label">Enter Description (Optional)</label>
          <div className="inputbox">
            <span className="currency-symbol"></span>
            <input
              type="text"
              value={description}
              name='description'
              onChange={handleDescription}
            />
          </div>
        </div>

        <button className="addmoney-button" onClick={handleInput}>
          Add Money
        </button>
      </div>
    </div>
    </>
  )
}

export default AddMoney
