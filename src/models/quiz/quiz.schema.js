import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctOption: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default quizSchema;
