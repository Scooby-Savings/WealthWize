import React, { useState, useContext } from 'react';
import { AuthContext } from "../authContext.js";
import IconContainer from './IconContainer.js';

const BudgetForm = ({ setSidebar }) => {

  const auth = useContext(AuthContext);
  const userID = auth.userID;
  const [goalAmount, setGoalAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSidebar(false);
    fetch('http://localhost:3000/dashboard/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        userID,
        goalAmount,
        goalCategory: category,
      }),
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='category-budget'>
      <form className='budget-form' onSubmit={handleSubmit}>
        <label for='input'>Add a budget</label>
        <input type='text' placeholder='Amount' onChange={(event) => setGoalAmount(event.target.value)}></input>
        <IconContainer setCategory={setCategory} />
        <div className='submit-container'>
          <button type='submit' className='submit-button'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default BudgetForm;
