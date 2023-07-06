import dbConnect from "../../database/conn";
import quizCourseTitleModel from "../../models/quizCourseTitle/quizCourseTitle.model";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Invalid request method" });
  }
  try {
    await dbConnect();
    const searchQuery = req.query.name;
    if (!searchQuery) {
      return res.status(400).json({
        status: false,
        error: "Query parameter 'name' is required",
      });
    } else {
      const QuizTitles = await quizCourseTitleModel.find({
        teacherName: searchQuery,
      });
      if (QuizTitles?.length === 0) {
        return res.status(404).json([]);
      }
      return res.status(200).json(QuizTitles);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

export default handler;
