import { Schema } from "mongoose";
import mongoose from "mongoose";

const quizRecordSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  quizID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  studentID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  quizStatus: {
    type: String,
    required: true,
  },
});

export default quizRecordSchema;
