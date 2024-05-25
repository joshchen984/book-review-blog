import mongoose, { type HydratedDocument } from 'mongoose';
import { BookSchema, type IBook } from './Book';

export interface IPost {
	title: string;
	content: string;
	rating: number;
	dateCreated: Date;
	path: string;
	book: IBook;
}
const PostSchema = new mongoose.Schema<IPost>({
	title: String,
	content: String,
	rating: Number,
	dateCreated: { type: Date, default: Date.now },
	path: String,
	book: BookSchema
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export function postToJson(post: HydratedDocument<IPost>) {
	return {
		title: post.title,
		content: post.content,
		post: post.rating,
		dateCreated: post.dateCreated,
		path: post.path,
		rating: post.rating,
		book: {
			title: post.book.title,
			description: post.book.description,
			author: post.book.author,
			publishDate: post.book.publishDate,
			genres: post.book.genres,
			coverUrl: post.book.coverUrl
		}
	};
}

export default Post;
