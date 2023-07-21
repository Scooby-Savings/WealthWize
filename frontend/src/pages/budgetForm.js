import React, { useState, useContext,useReducer } from 'react';
import { AuthContext } from "../authContext.js";
import CloseIcon from '../images/Icons/close';
import GroceriesIcon from '../images/Icons/groceries';
import DiningIcon from '../images/Icons/dining';
import EntertainmentIcon from '../images/Icons/entertainment';
import ClothingIcon from '../images/Icons/clothing';
import SubscriptionIcon from '../images/Icons/subscription';
import UtilitiesIcon from '../images/Icons/utilities';
import MediaclIcon from '../images/Icons/medical';
import TransportationIcon from '../images/Icons/transportation';
import HousingIcon from '../images/Icons/housing';


function BudgetForm({ setSidebar }) {

    const [goalAmount, setGoalAmount] = useState('');
    const [goalCategory, setGoalCategory] = useState('');
    const [value, setValue] = useState();
    const [bold, setBold] = useState();
    const auth = useContext(AuthContext);

    function useForceUpdate() {
        const [, forceUpdate] = useReducer(x => x + 1, 0);
        return forceUpdate;
      }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setValue('');
        setSidebar(false);
        // useForceUpdate()
        fetch('http://localhost:3000/dashboard/budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                // sending month for range of month - weekStart and weekEnd
                userID: auth.userID,
                goalAmount: goalAmount,
                goalCategory: goalCategory
            })
        })
            // .then(() => useForceUpdate())
            .catch(err => console.log(err))
    }

    // useForceUpdate()

    const handleChange = (event) => {
        setGoalAmount(event.target.value)
    }
    const handleClick = (event) => {
<<<<<<< HEAD
        console.log('handleClick value: ', event.currentTarget.getAttribute('value'))
       // event.currentTarget.style ='background-color: red';
=======
        // console.log('handleClick value: ', event.currentTarget.getAttribute('value'))
>>>>>>> dev
        setGoalCategory(event.currentTarget.getAttribute('value'))
    }

    return (
        <div className='category-budget'>
            {/* <form className='budget-form' onSubmit={(e) => { onSubmitHandler(e.target.value) }}> */}
            <form className='budget-form' onSubmit={onSubmitHandler}>
                <label for='input'>Add your Budget</label>
                {/* <input placeholder='Amount' onChange={(e) => setGoalAmount(e.target.value)}></input> */}
                <input type='text' placeholder='Amount' onChange={handleChange} value={value}></input>

                <div className='category-buttons'>
                    <div>
                        <button type='button' value='Groceries' onClick={(event) => handleClick(event)}><GroceriesIcon /></button>
                        <p>Grocery</p>
                    </div>
                    <div>
                        <button type='button' value='Dining' onClick={(event) => handleClick(event)}><DiningIcon /></button>
                        <p>Dining</p>
                    </div>
                    <div>
                        <button type='button' value='Entertainment' onClick={(event) => handleClick(event)}><EntertainmentIcon /></button>
                        <p>Entertainment</p>
                    </div>
                    <div>
                        <button type='button' value='Clothing' onClick={(event) => handleClick(event)}><ClothingIcon /></button>
                        <p>Clothing</p>
                    </div>
                    <div>
                        <button type='button' value='Subscription' onClick={(event) => handleClick(event)}><SubscriptionIcon /></button>
                        <p>Subscription</p>
                    </div>
                    <div>
                        <button type='button' value='Utilities' onClick={(event) => handleClick(event)}><UtilitiesIcon /></button>
                        <p>Utilites</p>
                    </div>
                    <div>
                        <button type='button' value='Medical' onClick={(event) => handleClick(event)}><MediaclIcon /></button>
                        <p>Medical</p>
                    </div>
                    <div>
                        <button type='button' value='Transportation' onClick={(event) => handleClick(event)}><TransportationIcon /></button>
                        <p>Transportation</p>
                    </div>
                    <div>
                        <button type='button' value='Housing' onClick={(event) => handleClick(event)}><HousingIcon /></button>
                        <p>Housing</p>
                    </div>
                </div>
                <button type='submit' className='submit-button'>Submit</button>
            </form>

        </div>
    )

}

export default BudgetForm;
