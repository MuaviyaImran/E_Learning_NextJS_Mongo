import CourseModel from "../../models/course/course.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const courseID = req.query.courseID;
    try {
      await dbConnect();
      await CourseModel.deleteOne({ _id: courseID }); // Delete the document with the specified ID

      return res.status(200).json({ message: "Course deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete the course." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
