import React, { useState, useContext } from 'react';
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
import { AuthContext } from "../authContext.js";

function ExpenseForm(){
    const auth=useContext(AuthContext);

    //this is the userID;
    const userID=auth.userID;
    const d = new Date();

const [category, setCategory] = useState();
const [expenseAmount, setExpenseAmount] = useState();
const [vendorName, setVendorName] = useState();
const [date, setDate] = useState(d);
//category selection
const handleButtonClick=(value)=>{
    setCategory(value);
}

const handleAmount = (val)=>{
    setExpenseAmount(val);
}

const handleVendor = (val)=>{
    setVendorName(val);
}

const handleDate = (val) => {
    const dateInput = new Date(val);
    const formattedDate = dateInput.toISOString().split('T')[0];
    setDate(formattedDate);
  };

//submit event
const handleSubmit= async()=>{
    try{
        const res = await fetch('http://localhost:3000/dashboard/expense',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                userID, 
                category,
                amount: expenseAmount,
                vendorName,
                date
            })
        })
        const resJson=res.json();
    }
    catch(err){
        console.log(err);
    }
}
  return ( 
<div className = "expenseForm">

  <div className="inputs">
    <p>Add your Expense</p>
    <form className="expenseinputs">
        <input placeholder="Amount" value={expenseAmount} onChange={(e)=>{handleAmount(e.target.value)}}></input>
        <input placeholder="Vendor" value={vendorName} onChange={(e)=>{handleVendor(e.target.value)}}></input>
        <input type="date" value={date}
        onChange={(e)=>{handleDate(e.target.value)}}></input>
    </form>
  </div>
  <div className='category-buttons'>
    <div>
        <button value="Groceries" onClick={(e)=>{handleButtonClick(e.currentTarget.getAttribute('value'))}}><GroceriesIcon /></button>
        <p>Grocery</p>
    </div>
    <div>
        <button value="Dining" onClick={(e)=>{handleButtonClick(e.currentTarget.getAttribute('value'))}}> <DiningIcon /></button>
        <p>Dining</p>
    </div>
    <div>
        <button value="Entertainment" onClick={(e)=>{handleButtonClick(e.currentTarget.getAttribute('value'))}}><EntertainmentIcon /></button>
        <p>Entertainment</p>
    </div>
    <div>
        <button value="Clothing" onClick={(e)=>{handleButtonClick(e.target.value)}}><ClothingIcon /></button>
        <p>Clothing</p>
    </div>
    <div>
        <button value="Subscriptions" onClick={(e)=>{handleButtonClick(e.target.value)}}><SubscriptionIcon /></button>
        <p>Subscription</p>
    </div>
    <div>
        <button value="Utilities" onClick={(e)=>{handleButtonClick(e.target.value)}}><UtilitiesIcon /></button>
        <p>Utilites</p>
    </div>
    <div>
        <button value="Medical" onClick={(e)=>{handleButtonClick(e.target.value)}}><MediaclIcon /></button>
        <p>Medical</p>
    </div>
    <div>
        <button value="Transportation" onClick={(e)=>{handleButtonClick(e.target.value)}}><TransportationIcon /></button>
        <p>Transportation</p>
    </div>
    <div>
        <button value="Housing" onClick={(e)=>{handleButtonClick(e.target.value)}}><HousingIcon /></button>
        <p>Housing</p>
    </div>
</div>
    <div className="submitbutton">
         <button onClick = {()=>{handleSubmit()}}> Submit</button>

    </div>
    </div>)
}

export default ExpenseForm;