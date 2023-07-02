import  dbConnect  from "../../database/conn";
import User from "@/models/user/user.model";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fname, lname, role, education, phone, userID, email } = req.body;
      
      await dbConnect();

      const updatedDocument = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(userID) },
        {
          $set: {
            firstname: fname,
            lastname: lname,
            email: email,
            role: role,
            ...(education && { education: education }),
            phone: phone,
          },
        },
        { new: true }
      );

      if (updatedDocument) {
        console.log("Updated document:", updatedDocument);
        return res.status(200).json({ success: true, message: "Profile updated successfully" });
      } else {
        console.log("Document not found");
        return res.status(404).json({ success: false, error: "Document not found" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ success: false, error: "Failed to update profile" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
