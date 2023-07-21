const { query } = require('express');
const db = require('../db/sqlmodel');

const dataController = {};

//savings table
dataController.savings = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."savings" WHERE user_id = ${res.locals.userID}`;
    console.log('querystr');
    console.log(querystr);
    console.log(req.body);
    const result = await db.query(querystr);

    const savingsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings = savingsTable;
    return next();
  } catch (err) {
    next(err);
  }
};

//budget
dataController.budget = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."budget" WHERE user_id = ${res.locals.userID}`;
    const result = await db.query(querystr);
    console.log('req.body in datacontroller.budget', req.body);

    const budgetTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.budget = budgetTable;
    return next();
  } catch (err) {
    next(err);
  }
};

//savings_goals
dataController.savings_goals = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."savings_goals" WHERE user_id = ${res.locals.userID}`;
    const result = await db.query(querystr);

    const savings_goalsTable = result.rows;
    console.log('saving goals table: ', savings_goalsTable);
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings_goals = savings_goalsTable;
    return next();
  } catch (err) {
    next(err);
  }
};

//transactions
dataController.transactions = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."transactions" WHERE user_id = ${res.locals.userID} ORDER BY date LIMIT 100`;
    const result = await db.query(querystr);

    const transactionsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.transactions = transactionsTable;
    return next();
  } catch (err) {
    next(err);
  }
};

//users
dataController.users = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."users"';
    const result = await db.query(querystr);

    const usersTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.users = usersTable;
    return next();
  } catch (err) {
    next(err);
  }
};

dataController.savingGoals = async (req, res, next) => {
  try {
    const { user_id, goal, amount } = req.body;
    const qryStr1 = `INSERT INTO savings_goals (user_id, category, goal)
  VALUES (${user_id}, '${goal}', ${amount});`;
    const qryStr2 = `INSERT INTO savings (user_id, category, amount, date)
  VALUES (${user_id}, '${goal}', 0, current_date);`;
    const result1 = await db.query(qryStr1);
    const result2 = await db.query(qryStr2);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

dataController.newExpense = async (req, res, next) => {
  try {
    const expense = req.body;
    querystr = `INSERT INTO transactions (user_id, category, amount, date, "vendorName")
      VALUES(${expense.userID}, '${expense.category}', ${expense.amount}, '${expense.date}', '${expense.vendorName}')`;

    const result = await db.query(querystr);
    return next();
  } catch (err) {
    next(err);
  }
};
module.exports = dataController;
