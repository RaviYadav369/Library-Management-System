const express = require('express')
const {books} = require("../data/books.json")
const {users} = require("../data/users.json")

const router = express.Router()

// Routes: /books
// Method:GET
//getting all books
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    });
});

// Routes: /books
// Method:GET
//getting all books by id

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id ===id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book is not found"
        })
    }
return res.status(200).json({
    success:true,
    data:book
});
});

// Routes: /books/issued
// Method:GET
//getting all issued  books 

router.get('/issued/by-user',(req,res)=>{
    const usersWithIssuedBook = users.filter((each) => {
        if(each.issuedBook) return each;
    });

    const issuedBooks = [];

    usersWithIssuedBook.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);

        if (issuedBooks.length === 0){
            return res.status(404).json({
                success:false,
                message:"There is no issued Book"
            })
        }
        return res.status(200).json({
            success:true,
            data:issuedBooks
        });
    });
});

module.exports = router