import { Schema } from "mongoose";
import mongoose from "mongoose";

const courseSchema = new Schema({
  videoURL: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  quizID: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  enrolled: {
    type: [mongoose.Types.ObjectId], // Array of mongoose ObjectIds
    default: [], // Initialize as an empty array
  },
});

export default courseSchema;
