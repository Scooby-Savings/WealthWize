import React, { useState } from 'react';
import './Overview.css';

const Overview = ({ dataTables }) => {
  const [modal, toggle] = useState(false);

  const accounts = {
    checking: dataTables.transactions?.reduce(
      (acc, transaction) => acc - transaction.amount,
      0
    ),
    savings: 0,
  };

  const total = accounts.savings + accounts.checking;

  console.log('DATA TABLE SAVINGS', dataTables.savings);
  // const [total, setTotal] = useState(null);
  // const [accounts, setAccounts] = useState({ checking: 5000, savings: 0 });
  // useEffect(() => {
  //   const fetchSavings = async () => {
  //     try {
  //       let savingsTable = dataTables?.savings; // Null check using optional chaining

  //       let savingsSum = 0;
  //       savingsTable.forEach((row) => {
  //         savingsSum += row.amount;
  //       });
  //       setAccounts((prevAccounts) => ({
  //         ...prevAccounts,
  //         savings: savingsSum,
  //       }));
  //     } catch (err) {
  //       console.log('Error at Overview.js:', err);
  //     }
  //   };

  //   fetchSavings();
  // }, [dataTables]);

  // useEffect(() => {
  //   console.log('Accounts:');
  //   console.log(accounts);
  //   if (accounts.checking !== null && accounts.savings !== null) {
  //     setTotal(accounts.checking + accounts.savings);
  //   }
  // }, [accounts]);
  const [selectedOption, setSelectedOption] = useState('');
  const [dropDown, setDropDown] = useState();
  const [goals, setGoals] = useState([]);

  return (
    <div className='Overview'>
      <p>Total Amount: </p>
      <h1 className='total'>${total}</h1>
      <div className='accounts'>
        <p>Checking: </p>
        <span>${accounts.checking}</span>
        <p>Savings: </p>
        <span>${accounts.savings}</span>
      </div>
    </div>
  );
};
export default Overview;
