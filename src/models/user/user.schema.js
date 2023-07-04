import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import validator from "validator";
import mongoose from "mongoose";
import { comparePassword } from "@models/user/user.methods";
import { findOneOrCreate } from "@models/user/user.static";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: [true, 'Account already exists'],
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false,
  },
  profilePic: {
    type: String,
    default: process.env.NO_PROFILE_URL,
  },
  role: {
    type: String,
  },
  education: {
    type: String,
  },
  phone: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  courses: {
    type: [mongoose.Types.ObjectId], // Array of mongoose ObjectIds
    default: [], // Initialize as an empty array
  },
});

userSchema.statics.findOneOrCreate = findOneOrCreate;
userSchema.methods.comparePassword = comparePassword;

// middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default userSchema;
