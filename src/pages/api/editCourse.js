import CourseModel from "../../models/course/course.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const courseID = req.query.courseID;
      const updates = req.body;
      await dbConnect();
      const course = await CourseModel.findByIdAndUpdate(courseID, updates, {
        new: true,
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }

      return res.status(200).json(course);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update course." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
