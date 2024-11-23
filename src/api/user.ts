import express from 'express'
import dotenv from 'dotenv'
import {  getBudget, login, register, updateBudget } from '../controller/userController';
import { verifyToken } from '../util/verify';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controller/expenseController';
dotenv.config()
const userAPI = express()

userAPI.post('/register', register);
userAPI.post('/login', login);

userAPI.get('/budget/:userId', verifyToken ,getBudget);
userAPI.put('/budget/:userId', verifyToken ,updateBudget);


userAPI.post('/expense/:userId', verifyToken , addExpense);
userAPI.get('/expense/:userId', verifyToken ,getExpenses);
userAPI.put('/expense/:expenseId', verifyToken ,updateExpense);
userAPI.delete('/expense/:expenseId', verifyToken ,deleteExpense);


export default userAPI