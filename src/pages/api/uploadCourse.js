import cloudinary from "cloudinary";
import multiparty from "multiparty";
import CourseModel from "../../models/course/course.model";
import quizCourseTitleModel from "../../models/quizCourseTitle/quizCourseTitle.model";
import dbConnect from "../../database/conn";
import mongoose from "mongoose";
export default async function uploadCourseHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { courseName, details, name, videoURL, userID, email, role } =
      req.body;

    const mongoose = require("mongoose");
    await dbConnect();
    const approved = process.env.ADMIN_EMAIL === email ? true : false;


    const newCourse = new CourseModel({
      videoURL: videoURL,
      courseName: courseName,
      details: details,
      name: name,
      email: email,
      userID: mongoose.Types.ObjectId(userID),
      role: role,
      approved: approved,
      enrolled: [],
    });

    await newCourse.save().then(async (res) => {
      const CourseTitle = new quizCourseTitleModel({
        courseID: mongoose.Types.ObjectId(res._id),
        courseName: courseName,
        teacherName: name,
      });
      await CourseTitle.save();
    });

    return res
      .status(200)
      .json({ success: true, message: "Upload successful" });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to upload file" });
  }
}
