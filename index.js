const express = require("express");
const dotenv = require("dotenv")

const DbConnection = require('./dataBaseConnection')
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const port = 8081;

app.use(express.json());

app.use('/users',usersRouter);
app.use('/books',booksRouter);



app.get("*", (req, res) => {
  res.status(500).json({
    message: "Server is running",
  });
});
app.listen(port, () => {
  console.log("Server is running at 8081");
});
