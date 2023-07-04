import dbConnect from "../../database/conn";
import User from "@/models/user/user.model";
import CourseModel from "@/models/course/course.model";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userID, courseID } = req.body;
      console.log("userID", userID, "courseID", courseID);
      await dbConnect();

      User.findByIdAndUpdate(
        userID,
        { $push: { courses: courseID } },
        (err, updatedUser) => {
          if (err) {
            console.error("Error updating user:", err);
            // Handle the error
          } else {
            console.log("User updated:", updatedUser);
            // The user document with the updated courses field will be logged here
          }
        }
      );

      CourseModel.findByIdAndUpdate(
        courseID,
        { $push: { enrolled: userID } },
        (err, updatedUser) => {
          if (err) {
            console.error("Error updating user:", err);
            // Handle the error
          } else {
            console.log("User updated:", updatedUser);
            // The user document with the updated courses field will be logged here
          }
        }
      );
      return res
        .status(200)
        .json({ success: true, message: "Enrolled successfully" });
    } catch (error) {
      console.error("Error enrolling User:", error);
      return res
        .status(500)
        .json({ success: false, error: "Document not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
