/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userSchema";
import Expense from "../models/expenseSchema";

export const register = async (req: any, res: any) => {
    try {
        const { username, password } = req.body;
      
        const user:IUser | null = await User.findOne({username})

      if(user){
        return res.status(400).json({ error: 'User Already Exist' });
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        expenses: []
      })
      res.status(200).send({newUser})

    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({message:"Invalid Data or Email Already Taken"})
    }
}

export const login = async (req: any, res: any) => {
  try {
      const params:any = req.body
      const user:IUser | null = await User.findOne({ username: params.username })
      if(user){
          const isMatch = await bcrypt.compare(params.password, user.password.toString())
          if(isMatch){
              const payload = {
                  id: user._id,
                  role: user.username,
              };
              jwt.sign(
                  payload,
                  `${process.env.JWT_SECRET}`,
                  { expiresIn: "12hr" },
                  async (err, token) => {
                      if(err){
                          res.status(400).send({message: err.message})
                      }else{
                          res.status(200).send({token: token})
                      }
                  }
              )  
          }else{
              res.status(400).send({ok:false, message:"Incorrect Email or Password" })
          }
      }else{
          res.status(400).send({message:"Incorrect Email or Password" })
      }
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data or Email Already Taken"})
  }
}

export const updateBudget = async (req: any, res: any) => {
    const { userId } = req.params;
    const { value } = req.body;
    try {
        const budget : IUser | null = await User.findOneAndUpdate(
          {
              _id: userId
          },
          {
              budget : value,
          }
        );
  
        res.status(200).json({ message: 'Budget updated successfully' , budget});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
export const getBudget = async (req: any, res: any) => {
    const { userId } = req.params;
    try {
        // Update the user's budget
        const user: IUser | null = await User.findById(userId);

       if(user){
            // Get all the expenses for the user
            const expenses = await Expense.find({ user: userId });

            // Calculate the total expenses
            const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

            // Calculate the balance (budget - totalExpenses)
            const balance = user.budget ? user.budget - totalExpenses : 0;

            // Respond with the updated budget, total expenses, and balance
            res.status(200).json({
                message: 'Budget Fetch successfully',
                budget: user?.budget || 0,
                totalExpenses,
                balance
            });
       }
       else{
            res.status(200).json({
                message: 'Budget Not FOund',
                budget: 0,
                totalExpenses: 0,
                balance: 0
            });
       }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

  