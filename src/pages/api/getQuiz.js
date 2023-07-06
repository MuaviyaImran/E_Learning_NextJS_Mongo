
import Quiz from '../../models/quiz/quiz.model';
import dbConnect from "../../database/conn";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { quizID } = req.body;

    try {
      await dbConnect();

      const quiz = await Quiz.findById(quizID);
      res.status(200).json({ quizData: JSON.parse(JSON.stringify(quiz)) });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;