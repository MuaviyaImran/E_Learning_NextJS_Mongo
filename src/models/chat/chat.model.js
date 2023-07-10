import { model, models } from "mongoose";
import chatSchema from "./chat.schema";
const ChatModel = models.Chat || model("Chat", chatSchema);

export default ChatModel;
