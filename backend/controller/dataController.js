const { query } = require('express');
const db = require('../db/sqlmodel');

const dataController = {};

//savings table
dataController.savings = async (req, res, next) => {
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."savings" WHERE user_id = ${res.locals.userID};`;
    // console.log('querystr');
    // console.log(querystr);
    // console.log(req.body);
    const result = await db.query(querystr);

    const savingsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings = savingsTable;
    console.log(res.locals.savings);
    return next();
  } catch (err) {
    next(err);
  }
};

//budget
dataController.budget = async (req, res, next) => {
  // console.log('i am in dataController.budget');
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."budget" WHERE user_id = ${res.locals.userID};`;
    const result = await db.query(querystr);
    console.log('req.body in datacontroller.budget', req.body);

    const budgetTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.budget = budgetTable;
    //    console.log(res.locals.budget);
    return next();
  } catch (err) {
    next(err);
  }
};

//savings_goals
dataController.savings_goals = async (req, res, next) => {
  // console.log('i am in dataController.savings_goals')
  try {
    let savings_goalsTable;
    // console.log(req.body, 'req.body above');
    if (req.body.action === 'add') {
      //change querystr when figured out if we are matching userid or username
      const querystr = `SELECT * FROM "public"."savings_goals" WHERE user_id = ${res.locals.userID};`;
      const result = await db.query(querystr);

      savings_goalsTable = result.rows;
      // console.log('saving goals table: ', savings_goalsTable);
    } else if (req.body.action === 'remove') {
      const querystr = `DELETE * FROM "public"."savings_goals" WHERE user_id = ${res.locals.userID} AND goal = ${req.body.goal} RETURNING *;`;
      const result = await db.query(querystr);
      console.log('deleted row:', result);
    }
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings_goals = savings_goalsTable;
    //    console.log(res.locals.savings_goals);
    return next();
  } catch (err) {
    next(err);
  }
};

//transactions
dataController.transactions = async (req, res, next) => {
  // console.log('i am in dataController.transactions')
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = `SELECT * FROM "public"."transactions" WHERE user_id = ${res.locals.userID} ORDER BY date LIMIT 100;`;
    const result = await db.query(querystr);

    const transactionsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.transactions = transactionsTable;
    //    console.log(res.locals.transactions);
    return next();
  } catch (err) {
    next(err);
  }
};

//users
dataController.users = async (req, res, next) => {
  // console.log('i am in dataController.users')
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."users";';
    const result = await db.query(querystr);

    const usersTable = result.rows;
    // let savingsSum = 0;
    // savingstable.forEach((row) => {
    //   savingsSum += row.amount;
    // });

    res.locals.users = usersTable;
    //    console.log(res.locals.users);
    return next();
  } catch (err) {
    next(err);
  }
};

dataController.savingGoals = async (req, res, next) => {
  try {
    if (req.body.action === 'add') {
      // console.log('req.body: ', req.body);
      const { user_id, goal, amount } = req.body;
      const qryStr1 = `INSERT INTO savings_goals (user_id, category, goal)
    VALUES (${user_id}, '${goal}', ${amount});`;
      const qryStr2 = `INSERT INTO savings (user_id, category, amount, date)
    VALUES (${user_id}, '${goal}', 0, current_date);`;
      await db.query(qryStr1);
      await db.query(qryStr2);
      res.sendStatus(200);
    } else if (req.body.action === 'remove') {
      const { user_id, goal } = req.body;

      const qry = `DELETE FROM savings_goals WHERE user_id = ${user_id} AND category = '${goal}' RETURNING *;`;
      const qry2 = `DELETE FROM savings WHERE user_id = ${user_id} AND category = '${goal}' RETURNING *;`;
      const result = await db.query(qry);
      await db.query(qry2);
      // console.log('deleted:', result);
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

dataController.newExpense = async (req, res, next) => {
  try {
    // console.log(req.body);
    const expense = req.body;
    // console.log(expense);
    querystr = `INSERT INTO transactions (user_id, category, amount, date, "vendorName")
      VALUES(${expense.userID}, '${expense.category}', ${expense.amount}, '${expense.date}', '${expense.vendorName}');`;

    const result = await db.query(querystr);
    return next();
  } catch (err) {
    next(err);
  }
};
module.exports = dataController;
