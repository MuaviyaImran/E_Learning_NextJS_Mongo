import BookModel from "../../models/books/book.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const books = await BookModel.find({});

      if (books.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(books);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get books." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
