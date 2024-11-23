/* eslint-disable @typescript-eslint/no-explicit-any */
import Budget from "../models/budgetSchema";
import User from "../models/userSchema";
import { IBudget } from "../util/interface";


// Add Budget
export const addBudget = async (req: any, res: any) => {
  const { userId, value, dateFrom, dateTo } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await Budget.create({
        user: user._id,
        value,
        date: {
            dateFrom,
            dateTo
        }
      })

      res.status(201).json({ message: 'Budget added successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
}

export const getBudgets = async (req: any, res: any) => {
  const { userId } = req.params;

  try {
      const budgets = await Budget.find({user: userId});

      res.status(200).json(budgets);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
}

export const updateBudget = async (req: any, res: any) => {
  const { budgetId } = req.params;
  const { value, dateFrom, dateTo } = req.body;

  try {

      // Find the specific budget entry by its ID
      const budget : IBudget | null = await Budget.findOneAndUpdate(
        {
            _id: budgetId
        },
        {
            value : value,
            date:  {
                dateFrom : dateFrom,
                dateTo : dateTo
            } 
        }
      );

      res.status(200).json({ message: 'Budget updated successfully' , budget});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
}

export const deleteBudget = async (req: any, res: any) => {
    const { budgetId } = req.params;
    try {
       await Budget.findByIdAndDelete(budgetId)
  
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

