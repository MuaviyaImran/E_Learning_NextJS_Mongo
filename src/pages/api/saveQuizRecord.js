import dbConnect from "../../database/conn";
import QuizRecord from "@/models/quizRecord/quizRecord.model";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { courseName, quizID, studentID, studentName, quizStatus } =
        req.body;
      await dbConnect();

      const newQuizRecord = new QuizRecord({
        courseName: courseName,
        quizID: quizID,
        studentID: studentID,
        studentName: studentName,
        quizStatus: quizStatus,
      });
      await newQuizRecord.save();
      return res.status(200).json(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update profile" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
