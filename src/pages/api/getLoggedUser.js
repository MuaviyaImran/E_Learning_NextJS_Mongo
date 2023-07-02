import dbConnect from "../../database/conn";
import UserModel from "../../models/user/user.model";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Invalid request method" });
  }
  try {
    await dbConnect();
    const searchQuery = req.query.userID;
    if (!searchQuery) {
      return res.status(400).json({
        status: false,
        error: "Query parameter 'userID' is required",
      });
    } else {
      const profile = await UserModel.findOne({
        _id: searchQuery,
      });
      if (profile?.length === 0) {
        return res
          .status(404)
          .json({ status: true, error: "No matching history found" });
      }
      return res.status(200).json({ profile: profile });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

export default handler;
