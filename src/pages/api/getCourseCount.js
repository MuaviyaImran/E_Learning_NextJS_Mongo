import dbConnect from "../../database/conn";
import CourseModel from "../../models/course/course.model";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const courses = await CourseModel.find({});

      res.status(200).json({ courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch users." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
