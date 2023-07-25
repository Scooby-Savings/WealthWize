import React, { useState } from "react";
import "./sidebar.css";
import CloseIcon from "../images/Icons/close";
import GroceriesIcon from "../images/Icons/groceries";
import DiningIcon from "../images/Icons/dining";
import EntertainmentIcon from "../images/Icons/entertainment";
import ClothingIcon from "../images/Icons/clothing";
import SubscriptionIcon from "../images/Icons/subscription";
import UtilitiesIcon from "../images/Icons/utilities";
import MediaclIcon from "../images/Icons/medical";
import TransportationIcon from "../images/Icons/transportation";
import HousingIcon from "../images/Icons/housing";
import ExpenseForm from "./expenseForm";
import BudgetForm from "./budgetForm";
import GoalForm from "./goalForm";

const Sidebar = ({ setSidebar, setRerender }) => {
  //declare the three states for expense, goal, and budget selections
  const [expenseSelection, setExpenseSelection] = useState(true);
  const [budgetSelection, setBudgetSelection] = useState(false);
  const [goalSelection, setGoalSelection] = useState(false);
  const clearedTitleColors = {expense: '', budget: '', goal: ''};
  const [titleColors, setTitleColors] = useState({expense: '#E65100', budget: '', goal: ''});

  //handle onClick event when expense/goal/ or budget is clicked
  const handleSideBarSelection = (value) => {
    setTitleColors({...clearedTitleColors, [value]:'#E65100'});

    value === "expense" ? setExpenseSelection(true) : setExpenseSelection(false);
    value === "budget" ? setBudgetSelection(true) : setBudgetSelection(false);
    value === "goal" ? setGoalSelection(true) : setGoalSelection(false);
  };

  return (
    <div className="Sidebar">
      <div className="closed-button">
        <button onClick={() => setSidebar(false)} id="close-button">
          <CloseIcon />
        </button>
      </div>
      <div className=""></div>
      <div className="sidebar-content">
        <div className="sidebar-selection">
          <button
            style={{color: titleColors.expense}}
            className="expense"
            value="expense"
            onClick={(e) => handleSideBarSelection(e.target.value)}
          >
            Expense
          </button>
          <button
          style={{color: titleColors.budget}}
            className="budget"
            value="budget"
            onClick={(e) => handleSideBarSelection(e.target.value)}
          >
            Budget
          </button>
          <button
            style={{color: titleColors.goal}}
            className="goal"
            value="goal"
            onClick={(e) => handleSideBarSelection(e.target.value)}
          >
            Goal
          </button>
        </div>
        {expenseSelection && <ExpenseForm setSidebar={setSidebar} setRerender={setRerender}/>}
        {budgetSelection && <BudgetForm setSidebar={setSidebar}/>}
        {goalSelection && <GoalForm setSidebar={setSidebar} />}
      </div>
    </div>
  );
};
export default Sidebar;
