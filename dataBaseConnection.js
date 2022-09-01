const mongoose = require('mongoose')


function DbConnection () {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console,"connection Error"))
  db.once("open",function () {
    console.log("DateBase is connecting....");
  })
}

module.exports = DbConnection;