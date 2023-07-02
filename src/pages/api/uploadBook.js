import cloudinary from "cloudinary";
import multiparty from "multiparty";
import dbConnect from "../../database/conn";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadCourseHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Failed to parse form data" });
    }

    try {
      console.log("fields", fields);
      console.log("files", files);
      const file = files.book[0];
      console.log(file.path);
      const result = await cloudinary.uploader.upload(
        file.path,
        {
          resource_type: 'raw',
          folder: 'pdfs',
        },)
        console.log(result)
        // .upload_large(file.path, "ml_default", {
        //   resource_type: "raw",
        //   format: "pdf",
        // })
      
        // .then(async (res) => {
          //     const mongoose = require("mongoose");
          //     await dbConnect();
          // const videoURL = res.secure_url;
          // console.log(videoURL);
          //     const courseName = fields.courseName[0];
          //     const details = fields.details[0];
          //     const name = fields.name[0];
          //     const email = fields.email[0];
          //     const userID = fields.userID[0];
          //     const subjectName = fields.subjectName[0];
          //     const role = fields.role[0];
          //     const approved = process.env.ADMIN_EMAIL === email ? true : false;
          //     const newCourse = new CourseModel({
          //       videoURL: videoURL,
          //       courseName: courseName,
          //       details: details,
          //       name: name,
          //       email: email,
          //       userID: mongoose.Types.ObjectId(userID),
          //       subjectName: subjectName,
          //       role: role,
          //       approved: approved,
          //     });
          //     await newCourse.save();
        // });

      return res
        .status(200)
        .json({ success: true, message: "Upload successful" });
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to upload file" });
    }
  });
}
