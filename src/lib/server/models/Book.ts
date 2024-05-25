import mongoose from 'mongoose';

export interface IBook {
	title: string;
	author: string;
	genres: string[];
	description: string;
	publishDate: Date;
	coverUrl: string;
}
export const BookSchema = new mongoose.Schema<IBook>({
	title: String,
	author: String,
	genres: [String],
	description: String,
	publishDate: { type: Date },
	coverUrl: String
});

const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;
