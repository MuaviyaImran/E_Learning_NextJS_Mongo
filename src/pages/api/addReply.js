import ChatModel from "../../models/chat/chat.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      await dbConnect();
      const { commentID, reply } = req.body;
      // Find the chat document by commentID
      const chat = await ChatModel.findById({ _id: commentID });
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      // Add the reply to the replies array
      chat.replies.push(reply);

      // Save the updated chat document
      const savedChat = await chat.save();

      res.status(200).json(savedChat);
    } catch (error) {
      console.error("Error adding reply:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
