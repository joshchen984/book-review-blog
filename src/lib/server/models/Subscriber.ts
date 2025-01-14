import mongoose from 'mongoose';

export interface ISubscriber {
	email: string;
	subscribeDate: Date;
}
export const SubscriberSchema = new mongoose.Schema<ISubscriber>({
	email: String,
	subscribeDate: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
export default Subscriber;
