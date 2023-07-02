import { model, models} from 'mongoose';
import courseSchema from './course.schema';

const CourseModel = models.Course || model("Course", courseSchema);

export default CourseModel;
