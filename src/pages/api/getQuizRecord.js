import dbConnect from "../../database/conn";
import QuizRecord from "@/models/quizRecord/quizRecord.model";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const quizRecord = await QuizRecord.find({})
      if (!quizRecord) {
        return res.status(200).json([]);
      }

      return res.status(200).json(quizRecord);
    } catch (error) {
      console.error("Error Getting Record:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to Getting Record" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
