import mongoose from 'mongoose';

export interface IBook {
	title: string;
	author: string;
	genres: string[];
	description: string;
	publishDate: Date;
}
export const BookSchema = new mongoose.Schema<IBook>({
	title: String,
	author: String,
	genres: [String],
	description: String,
	publishDate: { type: Date }
});

const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;
