import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../util/interface';


const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budget: [],
    expenses: []
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
