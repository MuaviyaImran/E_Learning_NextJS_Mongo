const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  profilePic: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  createdByID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  replies: [
    {
      created_at: {
        type: Date,
        default: Date.now,
      },
      createdByName: {
        type: String,
        required: true,
      },
      createdByID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      profilePic: {
        type: String,
        required: true,
      },
      msg: {
        type: String,
        required: true,
      },
    },
  ],
});

export default chatSchema;
