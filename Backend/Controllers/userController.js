import sql from 'mssql'
import config from '../db/config.js';
import { Connection } from '../utils/dbHelpers.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
        const { name, email, password, role } = req.body;
        const result = await db.executeProcedure("GetUser", { email });
        if (result.recordset.length > 0) {
          return res.json({ error: "Account already exists,use another email!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.executeProcedure("CreateUser", {
          name,
          email,
          password: hashedPassword,
          role
        });
        res.json({ message: "Account created successfully" });
      } catch (error) {
        res.json({error: error.message});
      }
}

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
                const token = `${jwt.sign({ userId: user.user_id, role: user.role, email: user.email }, config.jwt_secret)}`;
                res.status(200).json({message: "logged in succesfully", userId: user.user_id, email: user.email, role: user.role,  token: token });
            }
        } 
    } catch (error) {
        res.status(201).json({ error: error.message });
        
    }
}