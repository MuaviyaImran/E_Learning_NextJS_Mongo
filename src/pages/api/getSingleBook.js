import BookModel from "../../models/books/book.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const bookID = req.query.bookID;
      await dbConnect();
      const books = await BookModel.findOne({ _id: bookID });


      return res.status(200).json(books);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get books." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
