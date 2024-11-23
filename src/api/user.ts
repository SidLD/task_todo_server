import express from 'express'
import dotenv from 'dotenv'
import {  login, register } from '../controller/userController';
import { verifyToken } from '../util/verify';
import { addBudget, deleteBudget, getBudgets, updateBudget } from '../controller/budgetController';
import { addExpense } from '../controller/expenseController';
dotenv.config()
const userAPI = express()

userAPI.post('/register', register);
userAPI.post('/login', login);

userAPI.post('/budget', verifyToken ,addBudget);
userAPI.get('/budget/:userId', verifyToken ,getBudgets);
userAPI.put('/budget/:budgetId', verifyToken ,updateBudget);
userAPI.delete('/budget/:budgetId', verifyToken ,deleteBudget);


userAPI.post('/expense', verifyToken , addExpense);
userAPI.get('/expense/:userId', verifyToken ,getBudgets);
userAPI.put('/expense/:expenseId', verifyToken ,updateBudget);
userAPI.delete('/expense/:expenseId', verifyToken ,deleteBudget);


export default userAPI