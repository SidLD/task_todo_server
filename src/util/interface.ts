import mongoose, { Types } from "mongoose";

// IUser Interface
export interface IUser {
    _id: Types.ObjectId;  // Using ObjectId type from Mongoose
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    title?: string;
    password: string;
    role: 'ADMIN' | 'USER' | 'TEACHER'
}

// ISubject Interface
export interface ISubject {
    _id: Types.ObjectId;  // Using ObjectId type for consistency
    name: string;
}

// ITask Interface
export interface ITask {
    subject: ISubject
    teacher: IUser,
    user: IUser;
    value: number;
    title: string;
    todo: ITodo[]
}

// ITodo Interface
export interface ITodo {
    _id: Types.ObjectId;  // Using ObjectId type
    name: string;
    startDate: Date;
    endDate: Date;
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED';  // Use a union of string literals directly
}
