import ChatModel from "../../models/chat/chat.model";
import dbConnect from "../../database/conn";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.id) {
      try {
        await dbConnect();
        const chat = await ChatModel.findOne({ _id: req.query.id }); // Assuming you pass the document ID as a query parameter 'id'
        res.status(200).json(chat);
      } catch (error) {
        console.error("Error retrieving chat:", error);
        res.status(500).json({ error: "Server error" });
      }
    } else {
      try {
        await dbConnect();
        const chat = await ChatModel.find({}); // Assuming you pass the document ID as a query parameter 'id'
        res.status(200).json(chat);
      } catch (error) {
        console.error("Error retrieving chat:", error);
        res.status(500).json({ error: "Server error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
