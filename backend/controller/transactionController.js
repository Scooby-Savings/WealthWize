const db = require('../db/sqlmodel');

const transactionController = {};

transactionController.rangeOfTransactions = async (req, res, next) => {
  console.log('-----> rangeOfTransction is running. req.body: ', req.body);
  try {
    // const query = `SELECT * FROM transactions WHERE user_id=${req.body.userID} AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
    const query = `SELECT * FROM transactions WHERE user_id=${req.body.userID} AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
        date desc;`;
    const result = await db.query(query);

    if (!result) {
      next('no db result');
    } else {
      res.status(200).send(result.rows);
    }
  } catch (err) {
    next(err);
  }
};

transactionController.goalTracker = async (req, res, next) => {
  // console.log('-----> goaltracker is running. req.body: ', req.body)
  try {
    const query = `SELECT *
        FROM savings_goals
        LEFT JOIN savings ON savings_goals.user_id = savings.user_id
        AND savings_goals.category = savings.category 
        WHERE savings_goals.user_id = ${req.body.userID};`;
    // WHERE savings_goals.user_id = '${req.body.userID}';`;

    const result = await db.query(query);

    if (!result) {
      next('no db result');
    } else {
      res.status(200).send(result.rows);
    }
  } catch (err) {
    next(err);
  }
};

transactionController.budgetSetter = async (req, res, next) => {
  try {
    const query1 = `SELECT * FROM budget WHERE user_id = ${req.body.userID} AND category= '${req.body.goalCategory}' `;
    const rv = await db.query(query1);
    // console.log('rv', rv, 'req.body.userid', req.body.userID, 'query1', query1);
    if (rv.rows.length) {
      const query = `
          UPDATE budget
          SET budget = ${req.body.goalAmount}
          WHERE user_id = ${req.body.userID} AND category= '${req.body.goalCategory}' RETURNING *;`;

      const result = await db.query(query);
      if (!result) {
        next('no db result');
      } else {
        res.status(200);
      }
    } else {
      const query = `INSERT INTO budget (user_id, category, budget) VALUES (${req.body.userID}, '${req.body.goalCategory}',${req.body.goalAmount})`;
      // console.log('query2', query);
      const result = await db.query(query);
      if (!result) {
        next('no db result');
      } else {
        res.status(200);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = transactionController;

// SELECT *
// FROM savings_goals
// LEFT JOIN savings ON savings_goals.user_id = savings.user_id;
