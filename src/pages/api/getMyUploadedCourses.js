import CourseModel from "../../models/course/course.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const  userID  = req.query.userID;
    try {
      await dbConnect();
      const courses = await CourseModel.find({ userID: userID });

      if (courses.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(courses);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get courses." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
