const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date },
  education: { type: String },
  profilePic: { type: String },
  phone: { type: Number },
});

const User = model("User", userSchema);

module.exports = User;
