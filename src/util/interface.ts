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
    user: IUser;
    value: number;
    startDate: Date;
    endDate: Date;
    title: string;
}

// ITodo Interface
export interface ITodo {
    _id: Types.ObjectId;  // Using ObjectId type
    name: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED';  // Use a union of string literals directly
}
