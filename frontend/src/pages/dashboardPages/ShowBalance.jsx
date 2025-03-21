import React, { useEffect, useState } from "react";
import BASE_URL from "../../config/Api_base";
import axios from "axios";

const ShowBalance = () => {
  const [netamount, setNetamount] = useState([]);
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);

  let netBalance = 0;

  const id = localStorage.getItem("custId");

  const loadData = async () => {
    let api = `${BASE_URL}/customer/balancequiry`;

    try {
      let response = await axios.post(api, { custid: id });

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
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
    <div className="balancedisplay">
      <h1>Total Available Balance</h1>
      <h2 style={{color:"green"}}>Net Balance: {credit - debit}</h2>
      </div>
    </>
  );
};

export default ShowBalance;
