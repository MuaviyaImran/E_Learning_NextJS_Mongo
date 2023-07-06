import Quiz from "../../models/quiz/quiz.model";
import dbConnect from "../../database/conn";
import CourseModel from "../../models/course/course.model";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { questions, courseID } = req.body;

    try {
      // Connect to the database
      await dbConnect();

      // Create a new quiz document in MongoDB
      const quiz = new Quiz({ questions });
      await quiz.save().then((res) => {
        const quizID = res._id;
        CourseModel.findByIdAndUpdate(
          courseID,
          { $set: { quizID: quizID } },
          { new: true }
        ).then((updatedDocument) => {
          if (updatedDocument) {
            console.log("Document updated:", updatedDocument);
          } else {
            console.log("Document not found");
          }
        });
        //courseID
      });

      res.status(201).json({ message: "Quiz questions created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
