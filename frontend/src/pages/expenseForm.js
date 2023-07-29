import React, { useState, useContext } from 'react';
import { AuthContext } from '../authContext.js';
import IconContainer from './IconContainer';

function ExpenseForm({ setSidebar }) {
  const auth = useContext(AuthContext);
  const userID = auth.userID;
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const [vendorName, setVendorName] = useState();
  const [date, setDate] = useState();

  const handleDate = (val) => {
    const dateInput = new Date(val);
    const formattedDate = dateInput.toISOString().split('T')[0];
    setDate(formattedDate);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    setSidebar(false);

    fetch('http://localhost:3000/dashboard/expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        userID,
        category,
        amount,
        vendorName,
        date,
      }),
    }).catch((err) => console.log(err));
  };

  return (
    <div className='expenseForm'>
      <form className='budget-form' onSubmit={handleSubmit}>
        <label>Add an expense</label>
        <input
          placeholder='Amount'
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <input
          placeholder='Vendor'
          onChange={(e) => setVendorName(e.target.value)}
        ></input>
        <input type='date' onChange={(e) => handleDate(e.target.value)}></input>
        <IconContainer setCategory={setCategory} />
        <div className='submit-container'>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </form>
      <form className='budget-form' onSubmit={handleSubmit}>
        <label>Add an income</label>
        <input
          placeholder='Amount'
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <input
          placeholder='Source'
          onChange={(e) => setVendorName(e.target.value)}
        ></input>
        <input type='date' onChange={(e) => handleDate(e.target.value)}></input>
        <div className='submit-container'>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
