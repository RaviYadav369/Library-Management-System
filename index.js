const express = require("express");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const port = 8081;

app.use('/users',usersRouter);
app.use('/books',booksRouter);

app.use(express.json());


app.get("*", (req, res) => {
  res.status(500).json({
    message: "Server is running",
  });
});
app.listen(port, () => {
  console.log("Server is running at 8081");
});
