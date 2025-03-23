import React, { useState,useEffect } from 'react';
import BASE_URL from '../../config/Api_base';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../css/WithdrawMoney.css';

const WithdrawMoney = () => {
  const [amount, setAmount] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const quickmoney = [100, 500, 1000, 5000];
  const [netamount, setNetamount] = useState([]);
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(false)
  
    const handleDescription = (e)=>{
      setDescription(e.target.value);
      console.log(description);
      setStatus(true);
    }


  const id = localStorage.getItem("custId");

  const loadData = async () => {
    let api = `${BASE_URL}/customer/balancequiry`;

    try {
      let response = await axios.post(api,{ custid: id });

      const records = response.data.records;
      setNetamount(response.data.records);

      let totalDebit = 0;
      let totalCredit = 0;

      records.map((key) => {

        if (key.status === "debit") {
          totalDebit += key.amount;

        }
        
        if (key.status === "credit") {
          totalCredit += key.amount;
        }

      });

      setDebit(totalDebit);
      setCredit(totalCredit);
      setTotalBalance(totalCredit-totalDebit)
    } catch (error) {
      console.log(error);
    }
  };


  const handleInput = async () => {
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount!', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    if(amount >= totalBalance){
      toast.error('Insufficient Amount', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false); 
    }, 4000);

    let api = `${BASE_URL}/customer/moneytransaction`;

    try {
      let response = await axios.post(api, {
        amount: amount,
         description: status == true ? description:"Withdraw Cash" ,
        custid: localStorage.getItem('custId'),
        status: 'debit'
      });

      toast.success(response.data.msg, {
        position: 'top-center',
        autoClose: 3000,
      });

      setAmount('');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Something went wrong!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };


   useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="withdrawmoney-container">
      <div className="withdrawmoney-card">
        <h1 className="withdrawmoney-head">Withdraw Money</h1>
        <hr style={{ color: 'white' }} />

        <div className="quick-add">
          <h2 className="quick-label">Quick Withdraw</h2>
          {quickmoney.map((key) => (
            <button onClick={() => setAmount(key)}>₹{key}</button>
          ))}
        </div>

        <div className="input-container">
          <label className="withdrawmoney-label">Enter Withdrawal Amount:</label>
          <div className="inputbox">
            <input
              type="number"
              value={amount}
              placeholder="₹ 0.00"
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

          <button className="withdrawmoney-button" onClick={handleInput}>
            Withdraw
          </button>

        <div className="withdraw-action">
          {showAnimation && (
            <div className="money-animation">
              <img src="https://i.pinimg.com/originals/c8/60/99/c86099957a3356e39fbff8fc4a782369.gif" alt="Money Falling" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
