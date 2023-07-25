import React, { useState, useContext } from "react";
import "./goalForm.css";
import { AuthContext } from "../authContext";
import axios from "axios";

function GoalForm({ setSidebar }) {
  const auth = useContext(AuthContext);
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault;
    try {
      const response = await axios.post(
        "http://localhost:3000/dashboard/savegoal",
        {
          user_id: auth.userID,
          goal,
          amount,
        }
      );
    } catch (err) {
      console.log(err);
    }
    setSidebar(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  return (
    <form className="goalForm" onSubmit={handleSubmit}>
      <label>Add a goal</label>
      <input placeholder="Goal Title" onChange={handleGoalChange} />
      <input placeholder="Amount" onChange={handleAmountChange} />
      <div className='submit-container'>
        <button type="submit" className='submit-button'>Submit</button>
      </div>
    </form>
  );
}

export default GoalForm;
