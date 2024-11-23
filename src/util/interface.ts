import mongoose from "mongoose";

export interface IUser {
    _id: string | undefined;
    username: string;
    password: string;
    budget: number,
    expenses: [
        {
            value: number,
            date: Date
        }
    ]
}

export interface IExpenses {
    user: IUser
    value: number,
    date: Date
}
