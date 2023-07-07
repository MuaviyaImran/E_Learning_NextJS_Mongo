import BookModel from "../../models/books/book.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const bookID = req.query.bookID;
    try {
      await dbConnect();
      await BookModel.deleteOne({ _id: bookID }); // Delete the document with the specified ID

      return res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete the Book." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
