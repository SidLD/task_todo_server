/* eslint-disable @typescript-eslint/no-explicit-any */
import Expense from "../models/expenseSchema"; // Assuming you have an Expense model defined
import User from "../models/userSchema";
import { IExpenses } from "../util/interface";


// 1. Add Expense
export const addExpense = async (req: any, res: any) => {
    const { userId, value, date } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new expense record
        await Expense.create({
            user: user._id,
            value,
            date,
        });

        res.status(201).json({ message: 'Expense added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 2. Get All Expenses for a User (Read)
export const getExpenses = async (req: any, res: any) => {
    const { userId } = req.params;

    try {
        // Fetch all expenses for the user
        const expenses = await Expense.find({ user: userId });

        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 3. Update Expense (Update)
export const updateExpense = async (req: any, res: any) => {
    const { expenseId } = req.params;
    const { value, date } = req.body;

    try {
        // Find the specific expense entry by its ID and update it
        const expense: IExpenses | null = await Expense.findOneAndUpdate(
            { _id: expenseId },
            { value, date },
            { new: true } // Return the updated expense
        );

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 4. Delete Expense (Delete)
export const deleteExpense = async (req: any, res: any) => {
    const { expenseId } = req.params;

    try {
        // Delete the expense by its ID
        const expense = await Expense.findByIdAndDelete(expenseId);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
