/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userSchema";

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
        budget: [],
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
