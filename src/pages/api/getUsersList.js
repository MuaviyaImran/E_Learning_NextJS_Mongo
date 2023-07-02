import dbConnect from "../../database/conn";
import User from "../../models/user/user.model";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const users = await User.find({
        role: "user",
      });


      res.status(200).json({ users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch users." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
