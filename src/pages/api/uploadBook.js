import dbConnect from "../../database/conn";
import BookModel from "../../models/books/book.model";

export default async function uploadCourseHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      title,
      author,
      description,
      book,
      uploadedByName,
      role,
      email,
      uploadedByUserID,
    } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !book ||
      !uploadedByName ||
      !role ||
      !email ||
      !uploadedByUserID
    ) {
      return res.status(400).json({ message: "Missing required data" });
    } else {
      await dbConnect();
      const approved = process.env.ADMIN_EMAIL === email ? true : false;
      const newBook = new BookModel({
        BookTitle: title,
        author: author,
        description: description,
        bookFile: book,
        role: role,
        approved: approved,
        uploadedByName: uploadedByName,
        email: email,
        uploadedByID: uploadedByUserID,
      });
      await newBook.save();

      return res
        .status(200)
        .json({ success: true, message: "Upload successful" });
    }
  } catch (error) {
    console.error("Error uploading book to DB:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to upload file" });
  }
}
