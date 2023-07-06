import { Schema } from "mongoose";
import mongoose from "mongoose";

const quizCourseTitleschema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  teacherName: {
    type: String,
    required: true,
  },
});

export default quizCourseTitleschema;
