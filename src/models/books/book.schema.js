import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookSchema = new Schema({
  title: {
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
  bookCover: {
    type: String,
    required: true,
  },
  uploadedByName: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export default bookSchema;
