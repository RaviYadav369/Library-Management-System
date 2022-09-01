const IssuedBook = require('../dbos/book-dbos');
const { UserModal,BookModal } = require('../modals');

exports.getAllBooks =async (req, res) => {
    const books =await BookModal.find()

    if(books.length === 0){
        res.status(404).json({
            success:false,
            message:"No Book find"
        });
    }
    res.status(200).json({
      success: true,
      data: books,
    });
  };

exports.getSingleBookById =async  (req, res) => {
    const { id } = req.params;
    const book = await BookModal.findById(id);
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
  };

exports.getAllIssuesBooks = async (req, res) => {
    const users = await UserModal.find({ 
        issuedBooks :{ $exists :true},
    }).populate("issuedBook");
  
    const issuedBooks = users.map((each) => new IssuedBook(each));
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
  } ;
