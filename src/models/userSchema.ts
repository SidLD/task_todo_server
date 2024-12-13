import mongoose, { Schema, Types } from "mongoose";
import { ISubject, ITask, ITodo, IUser } from "../util/interface";

// IUser Schema
const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    title: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'USER', 'TEACHER'], default: 'USER' }
});

// ISubject Schema
const subjectSchema = new Schema<ISubject>({
    name: { type: String, required: true },
});

// ITask Schema
const taskSchema = new Schema<ITask>({
    user: { type: Types.ObjectId, ref: "User", required: true },  
    subject: { type: Types.ObjectId, ref: "Subject", required: true },  
    teacher:  { type: Types.ObjectId, ref: "User", required: true },  
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    todo: [
        { type: Types.ObjectId, ref: "Todo" }
    ],
    title: { type: String },
},
{timestamps: true});

// ITodo Schema
const todoSchema = new Schema<ITodo>({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['TO_DO', 'IN_PROGRESS', 'COMPLETED'], 
        required: true 
    },
},
{timestamps: true}
);

// Creating Mongoose models from the schemas
const User = mongoose.model<IUser>('User', userSchema);
const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
const Task = mongoose.model<ITask>('Task', taskSchema);
const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export { User, Subject, Task, Todo };
