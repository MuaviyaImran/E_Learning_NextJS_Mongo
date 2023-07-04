import { model, models } from "mongoose";
import quizCourseTitle from "./quizCourseTitle.schema";

const quizCourseTitleModel =
  models.quizCourseTitle || model("quizCourseTitle", quizCourseTitle);

export default quizCourseTitleModel;

