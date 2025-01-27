const db = require('../db/sqlmodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const generateToken = (result) => {
  const token = jwt.sign(
    { user_id: result.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queryStr = `SELECT * FROM users WHERE username = '${username}';`;
    const result = await db.query(queryStr);
    const loginCheck = await bcrypt.compare(password, result.rows[0].password);;
    const currDate = new Date();
    const dateQuery = currDate.getFullYear() + "-" + (currDate.getMonth()+1) + "-" + currDate.getDate();
    if (loginCheck) {
      const updateLoginQuery = `UPDATE users SET lastlogged = '${dateQuery}' WHERE username = '${req.body.username}';`;
      db.query(updateLoginQuery);

      res.status(200).json({
        status: 'success',
        token: generateToken(result),
        username: result.rows[0].username,
        userID: result.rows[0].id,
      });
    } else {
      next('username or password is incorrect');
    }
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const queryStr = `SELECT * FROM users WHERE username = '${req.body.username}';`;
    const result = await db.query(queryStr);
    console.log(JSON.stringify(result.rows[0].id))
    const currDate = new Date();
    const dateQuery = currDate.getFullYear() + "-" + (currDate.getMonth()+1) + "-" + currDate.getDate();
    if (result.rows.length > 0) {
      const updateLoginQuery = `UPDATE users SET lastlogged = '${dateQuery}' WHERE username = '${req.body.username}';`;
      db.query(updateLoginQuery);
      res.status(200).json({
        status: 'success',
        token: generateToken(result),
        username: result.rows[0].username,
        userID: result.rows[0].id,
      });
    } else {
      next('You must sign up first.');
    }
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const queryStrCreate = `INSERT INTO users (name, username, password, email) VALUES ('${name}', '${username}', '${hashed}', '${email}');`;
    await db.query(queryStrCreate);
    const queryStrRetrieve = `SELECT * FROM users WHERE username = '${username}' ;`;
    const result = await db.query(queryStrRetrieve);
    res.status(201).json({
      status: 'success',
      token: generateToken(result),
      username: result.rows[0].username,
      userID: result.rows[0].id,
    });
  } catch (err) {
    next(err);
  }
};

exports.googleSignup = async (req, res, next) => {
  try {
    const { name, username, email } = req.body;
    const queryStr = `SELECT * FROM users WHERE username = '${username}' AND email = '${email}';`;
    const initialCheck = await db.query(queryStr);
    if (initialCheck.rows.length > 0) {
      console.log('user already exists');
    } else {
      const queryStrCreate = `INSERT INTO users (name, username, password, email) VALUES ('${name}', '${username}', '${null}', '${email}');`;
      await db.query(queryStrCreate);
      const queryStrRetrieve = `SELECT * FROM users WHERE username = '${username}';`;
      const result = await db.query(queryStrRetrieve);
      res.status(201).json({
        status: 'success',
        token: generateToken(result),
        username: result.rows[0].username,
        userID: result.rows[0].id,
      });
    }
  } catch (err) {
    next(err);
  }
};



exports.checkLogs = async (req, res, next) => {
  const weekEarlier = new Date();
  weekEarlier.setDate(weekEarlier.getDate() - 7);
  const weekEarlierQuery = weekEarlier.toLocaleString();
  const queryStr = `SELECT * FROM users WHERE lastlogged <= ('${weekEarlierQuery}');`;
  const result = await db.query(queryStr);
  res.send(result.rows).status(200)
}

exports.protectRoute = async (req, res, next) => {
  // RETRIEVING TOKEN
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // CHECK IF TOKEN EXISTS
  if (!token) {
    next('no token');
  }

  // VERIFY TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //CHECK IS USER FOR THAT TOKEN EXISTS
  const queryStrRetrieve = `SELECT * FROM users WHERE id = '${decoded.user_id}';`;
  const resp = await db.query(queryStrRetrieve);
  if (!resp || resp.rows.length != 1) return next('invalid resP');
  // console.log(currUser);
  // console.log(`Handling resp:`);
  // console.log(resp);
  res.locals.userID = resp.rows[0].id;
  next();
};
