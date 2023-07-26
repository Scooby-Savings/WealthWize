import React, { useEffect, useState, useContext } from 'react';
import ApexDonut from './donut';
import { AuthContext } from '../authContext.js';
import './goals.css';
import FilterIcon from '../images/Icons/filter';

const Goals = () => {
  const auth = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [dropDown, setDropDown] = useState();
  const [reachedGoal, setReachGoal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/dashboard/savinggoals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        userID: auth.userID,
      }),
    })
    .then((response) => response.json())
    .then((data) => {

      // handle case where no info exists in db
      if (data.length === 0) {
        return;
      }

      const goalsFromDB = [];

      // parse through database results,
      // build an array of objects, each
      // object containing goal progress
      // information, i.e. goal category,
      // target amount, and current amount
      data.forEach((element) => {
        goalsFromDB.push({
          category: element.category,
          total: element.amount,
          goal: element.goal,
        });
      });
      setGoals(goalsFromDB);
      setDropDown(goalsFromDB[0].category);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className='Goals'>
      <div className='goal-header'>
        <h1>Goal</h1>
        <select onChange={(e) => setDropDown(e.target.value)}>
          {goals.length > 0 &&  // checking whether goals is empty to prevent any errors while trying to access its elements
            goals.map((goal) => {
              return (
                <option key={goal.category}>{goal.category}</option>
              );
            })}
        </select>
        <span className='filterIcon'>
          <FilterIcon />
        </span>
      </div>
      <div className="donut-div">
        {goals.length > 0 && ( // checking whether goals is empty to prevent any errors while trying to access its elements
          <>
            <ApexDonut
              goals={goals}
              dropDown={dropDown}
              setReachGoal={setReachGoal}
            />
            {goals.map((goal) => {
              if (goal.category === dropDown) {
                return (
                    <div className="donut-label">
                      <h1 id="donut-h1">${goal.goal}</h1>
                      {!reachedGoal && (
                        <p id="donut-p">
                          ${goal.goal - goal.total} to {goal.category}
                        </p>
                      )}
                    </div>
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Goals;
