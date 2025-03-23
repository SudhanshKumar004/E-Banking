import React, { useEffect, useState } from "react";
import BASE_URL from "../../config/Api_base";
import axios from "axios";
import "../../css/Statement.css"; 

const Statement = () => {
  const [statement, setStatement] = useState([]);
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const id = localStorage.getItem("custId");

  const loadData = async () => {
    let api = `${BASE_URL}/customer/accStatement`;

    try {
      let response = await axios.post(api, { custid: id });
      console.log(response.data);
      setStatement(response.data.statement);
      const balance = response.data.balance

      let totalDebit = 0;
      let totalCredit = 0;

      balance.map((key) => {

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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h2 className="totalbalance">Total Balance : {totalBalance}</h2>
    <div className="statement-container">
      <div className="table-wrapper">
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
          {statement.map((key) => (
            <tr>
              <td>{new Date(key.transactionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</td>
              <td>{key.description}</td>
              <td style={{color:"red"}}>{key.status === "debit" ? key.amount :""}</td>
              <td style={{color:"green"}}>{key.status === "credit" ? key.amount :""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
};

export default Statement;
