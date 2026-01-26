import Book from "../models/bookModel.js";

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      shelfLocation,
      totalCopies,
      availableCopies,
      image,
      description,
      status,
    } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book Alredy exist!",
      });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      shelfLocation,
      totalCopies,
      availableCopies,
      image,
      description,
      status,
    });

    await newBook.save();

    res.status(201).json({
        success:true,
        message:"Book Added Successfully!",
        newBook
    })
  } catch (error) {
    console.log(error)
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
return res.status(200).json({
    message:"Book find successfully",
    allBooks
})
  } catch (error) {
    console.log(error)
  }
};


export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await