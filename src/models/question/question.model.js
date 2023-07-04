import { model, models } from "mongoose";
import questionSchema from "./question.schema";

const QuestionModel =
  models.QuestionBank || model("QuestionBank", questionSchema);

export default QuestionModel;
