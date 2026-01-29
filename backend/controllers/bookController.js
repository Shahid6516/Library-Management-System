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
      success: true,
      message: "Book Added Successfully!",
      newBook,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json({
      success:true,
      message: "Book find successfully",
      allBooks,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book found successfully!",
      book,
    });
  } catch (error) {
    console.log(error);
  }
};

 export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      updatedBook,
    }); 
  } catch (error) {
    console.log(error);
  }
  };

  export const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Book deleted successfully!",
        deletedBook,
      });
    } catch (error) {
      console.log(error);
    }
  };

