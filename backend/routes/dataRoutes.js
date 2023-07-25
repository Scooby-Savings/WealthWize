const express = require('express');

const dataController = require('../controller/dataController');
const authController = require('../controller/authController');

const transactionController = require('../controller/transactionController');

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES

router.get(
  '/',
  authController.protectRoute,
  dataController.savings,
  dataController.budget,
  dataController.savings_goals,
  dataController.transactions,
  dataController.users,
  (req, res) => {
    return res.status(200).json({
      savings: res.locals.savings,
      budget: res.locals.budget,
      savings_goals: res.locals.savings_goals,
      transactions: res.locals.transactions,
      users: res.locals.users,
    });
  }
);

router.post('/transaction', transactionController.rangeOfTransactions);

router.post('/savinggoals', transactionController.goalTracker);

router.post('/budget', transactionController.budgetSetter);

router.post('/savegoal', dataController.savingGoals);

router.post('/expense', dataController.newExpense);

module.exports = router;
