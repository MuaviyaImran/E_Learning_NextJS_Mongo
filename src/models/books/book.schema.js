import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookSchema = new Schema({
  BookTitle: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  bookFile: {
    type: String,
    required: true,
  },
  uploadedByName: {
    type: String,
    required: true,
  },
  uploadedByID: {
    type: mongoose.Types.ObjectId,
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
});

export default bookSchema;
