import ChatModel from "../../models/chat/chat.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { profilePic, createdByName, createdByID, msg } = req.body;

      // Create a new chat document with empty replies

      const newChat = new ChatModel({
        profilePic,
        createdByName,
        createdByID,
        msg,
        replies: [],
      });
      await dbConnect();
      // Save the chat document to the database
      const savedChat = await newChat.save();

      res.status(200).json(savedChat);
    } catch (error) {
      console.error("Error saving chat:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
