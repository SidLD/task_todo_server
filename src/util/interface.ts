import mongoose from "mongoose";

export interface IUser {
    _id: string | undefined;
    username: string;
    password: string;
    budget: [
        {
            value: number,
            date: {
                dateFrom: Date,
                dateTo: Date
            }
        }
    ],
    expenses: [
        {
            value: number,
            date: Date
        }
    ]
}

export interface IBudget  {
    user: IUser,
    value: { type: Number, required: true },
    date: {
        dateFrom: { type: Date, required: true },
        dateTo: { type: Date, required: true },
    }
}

export interface IExpenses {
    user: IUser
    value: number,
    date: Date
}
