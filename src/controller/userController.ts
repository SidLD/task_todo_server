/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../models/userSchema";
import { IUser } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
    static async register(req: any, res: any) {
        try {
            const { email, password , firstName, lastName, middleName, role } = req.body;
          
            const user:IUser | null = await User.findOne({email})
    
          if(user){
            return res.status(400).json({ message: 'User Already Exist' });
          }
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = await User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            role: role 
          })
          res.status(200).send({newUser})
    
        } catch (error: any) {
            console.log(error.message)
            res.status(400).send({message:"Invalid Data or Email Already Taken"})
        }
    }
    
    static async login(req: any, res: any) {
        try {
            const params:any = req.body
            const user:IUser | null = await User.findOne({ email: params.email })
            if(user){
                const isMatch = await bcrypt.compare(params.password, user.password.toString())
                if(isMatch){
                    const payload = {
                        id: user._id,
                        firstname: user.firstName,
                        lastname: user.lastName,
                        middleName: user.middleName,
                        role: user.role
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

    static async getUsers(req: any, res: any) {
        try {
            const {role} = req.params
            const users = await User.find({role});
            res.status(200).json(users);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async getUserById(req: any, res: any) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateUser(req: any, res: any) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async deleteUser(req: any, res: any) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }
}
