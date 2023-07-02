import { model, models} from 'mongoose';
import bookSchema from './book.schema'
const BookModel = models.Book || model("Book", bookSchema);

export default BookModel;
