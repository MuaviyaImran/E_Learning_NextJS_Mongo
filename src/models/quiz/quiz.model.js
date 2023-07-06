import { model, models } from "mongoose";
import quizSchema from "./quiz.schema";

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
