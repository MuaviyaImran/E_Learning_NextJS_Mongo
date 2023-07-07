import { model, models } from "mongoose";
import quizRecordSchema from "./quizRecord.schema";

const QuizRecord =
  models.QuizRecord || model("QuizRecord", quizRecordSchema);

export default QuizRecord;

