
import mongoose, { Schema } from 'mongoose';
import { IExpenses } from '../util/interface';


const expenseSchema = new Schema<IExpenses>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Self-reference for user
    },
    value: { type: Number, required: true },
    date: { type: Date, required: true }
});

const Expense = mongoose.model<IExpenses>('Expense', expenseSchema);

export default Expense;
