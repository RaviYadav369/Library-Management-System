const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

// Routes: /books
// Method:GET
//getting all books
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

// Routes: /books
// Method:GET
//getting all books by id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book is not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
});

// Routes: /books/issued
// Method:GET
//getting all issued  books

router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    book.subscriptionType = each.subscriptionType;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "There is no issued Book",
    });
  }
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});

// Routes: /books
// Method:POST
//Adding the new books
//Data : author, name, genre, price, publisher, id

router.post("/", (req, res) => {
    
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "NO Data Found",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: true,
      message: "Books with this id is already exit",
    });
  }

  const allBooks = [...books, data];
  return res.status(201).json({
    success: true,
    data: allBooks,
  });
});

// Routes: /books/:id
// Method:PUT
//Update the books
router.put('/:id',(req,res)=>{
const {id} = req.params;
const {data} = req.body;
const book = books.find((each) => each.id === id)

if(!book){
    return res.status(400).json({
        success:false,
        message:"Book with this id is not found"
    });
}

const updateBooks = books.map((each) => {
if(each.id === id){
    return { ...each , ...data};
}
return each;
});

return res.status(200).json({
    success:true,
    data:updateBooks,
})

});




module.exports = router;
