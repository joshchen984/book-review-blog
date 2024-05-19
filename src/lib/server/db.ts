import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from '$env/static/private';

export const dbConnect = async () => {
	await mongoose.connect(MONGO_CONNECTION_URL);
};

export const dbDisconnect = async () => {
	await mongoose.disconnect();
};
