import { model, models, Model } from "mongoose";
import UserSchema from "@models/user/user.schema";

const UserModel = models.user || model ("user", UserSchema);

export default UserModel;
