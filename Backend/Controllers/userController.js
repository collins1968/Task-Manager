import config from '../db/config.js';
import { Connection } from '../utils/dbHelpers.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import nodeMailer from 'nodemailer';

const {mail_password} = config;

const db = new Connection();

export const GetUsers = async (req, res) => {
    try {
        const result = await db.executeProcedure("GetUsers")
        !result.recordset[0] ? res.status(404).json({ message: 'users not found' }):
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json({ error: error.message });
    }
}

export const CreateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const result = await db.executeProcedure("GetUser", { email });
        if (result.recordset.length > 0) {
          return res.json({ error: "Account already exists,use another email!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.executeProcedure("CreateUser", {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role
        });
        res.json({ message: "Account created successfully" });
      } catch (error) {
        res.json({error: error.message});
      }
}

export const UpdateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { first_name, last_name, email, role, phone, Address, About, Skills } = req.body;

    // Check if the user with the provided user_id exists
    const getUserResult = await db.executeProcedure("GetUserById", { user_id: userId });
    if (getUserResult.recordset.length === 0) {
      return res.json({ error: "User not found" });
    }

    // // If the email is being updated, check if the new email is already in use
    // if (email !== getUserResult.recordset[0].email) {
    //   const checkEmailResult = await db.executeProcedure("GetUser", { email });
    //   if (checkEmailResult.recordset.length > 0) {
    //     return res.json({ error: "Email already in use, please choose another one" });
    //   }
    // }
    // Update the user information
    
    await db.executeProcedure("UpdateUser", {
      user_id: userId,
      first_name,
      last_name,
      email,
      role,
      phone,
      Address,
      About,
      Skills,
    });

    res.json({ message: "User information updated successfully" });
     // Send email to the assigned user
  } catch (error) {
    res.json({ error: error.message });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.executeProcedure("GetUser", { email });
        const user = result.recordset[0];
        if (!user) {
            res.status(401).json({ error: 'Account does not exist' });
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).json({ error: 'Authentication failed. Wrong password.' });
            } else {
                const token = `${jwt.sign({ userId: user.user_id, first_name: user.first_name, last_name: user.last_name,  role: user.role, email: user.email }, config.jwt_secret)}`;
                res.status(200).json({userId: user.user_id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role,  token: token });
            }
        } 
    } catch (error) {
        res.status(201).json({ error: error.message });
        
    }
}