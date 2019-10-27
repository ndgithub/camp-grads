// This file only used for working with the database outside of the app.

const db = require('../models');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const connectDb = require('./db');

connectDb();

// Remove all users from database

// db.User.remove({}, (err, res) => {
//   if (err) console.log(err);
//   console.log(res);
// });

// db.Post.remove({}, (err, res) => {
//   if (err) console.log(err);
//   console.log(res);
// });

db.Profile.remove({}, (err, res) => {
  if (err) console.log(err);
  console.log(res);
});
