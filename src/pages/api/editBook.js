import BookModel from "../../models/books/book.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const bookID = req.query.bookID;
      const updates = req.body;
      await dbConnect();
      const book = await BookModel.findByIdAndUpdate(bookID, updates, { new: true });

      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }

      return res.status(200).json(book);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update book." });
    }
  }  else {
    res.status(405).json({ message: "Method not allowed." });
  }
}