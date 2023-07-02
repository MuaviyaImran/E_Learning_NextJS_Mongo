import CourseModel from "../../models/course/course.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const searchQuery = req.query.courseID;
    console.log(searchQuery);
    if (!searchQuery) {
      return res.status(400).json({
        status: false,
        error: "Query parameter 'courseID' is required",
      });
    } else {
      try {
        await dbConnect();
        const course = await CourseModel.findOne({ _id: searchQuery });
        console.log(course);
        if (!course) {
          return res.status(200).json([]);
        }

        return res.status(200).json(course);
      } catch (error) {
        return res.status(500).json({ message: "Failed to get course." });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
