import React, { useState } from 'react';
import BASE_URL from '../../config/Api_base';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../css/WithdrawMoney.css';

const WithdrawMoney = () => {
  const [amount, setAmount] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const quickmoney = [100, 500, 1000, 5000];

  const handleInput = async () => {
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount!', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setShowAnimation(true); // Show animation

    setTimeout(() => {
      setShowAnimation(false); // Hide animation after 4 seconds
    }, 4000);

    let api = `${BASE_URL}/customer/moneytransaction`;

    try {
      let response = await axios.post(api, {
        amount: amount,
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
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
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
