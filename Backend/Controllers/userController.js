import config from '../db/config.js';
import { Connection } from '../utils/dbHelpers.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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
      return res.json({ error: "Account already exists, use another email!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.executeProcedure("CreateUser", {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    // Send welcome email to the user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "collinsmwendwa1968@gmail.com",
        pass: mail_password,
      },
    });

    const mailOptions = {
      from: 'collinsmwendwa1968@gmail.com', // Replace with your email address
      to: email,
      subject: 'Welcome to Our Site!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Site!</title>
          <style>
            /* ... Your existing CSS styles ... */

            /* Update the background color, text color, and font */
            body {
              background-color: #f1f1f1;
              color: #333;
              font-family: 'Arial', sans-serif;
            }

            /* Add some spacing around the container */
            .email-container {
              padding: 20px;
              margin: 0 auto;
              max-width: 600px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            /* Center the logo */
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }

            /* Style the welcome message */
            .welcome-message {
              text-align: center;
              margin-bottom: 20px;
            }

            /* Style the button with a nice gradient background and hover effect */
            .btn-primary {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #007BFF 0%, #00BCD4 100%);
              color: #fff;
              text-decoration: none;
              border-radius: 30px;
              transition: background-color 0.3s ease;
            }

            .btn-primary:hover {
              background: #007BFF;
            }

            /* Center the button */
            .action-button {
              text-align: center;
              margin-top: 30px;
            }

            /* Add a separator line after the button */
            .action-button:after {
              content: '';
              display: block;
              width: 100%;
              height: 1px;
              background-color: #ccc;
              margin: 20px 0;
            }

            /* Style the footer */
            .footer {
              text-align: center;
              color: #999;
            }

            /* Make the footer text a bit smaller */
            .footer p {
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkEDXuxoiPnWDkwgYh0lPbk56IHIcb7SRDXg&usqp=CAU" alt="Your Logo" style="max-width: 150px;">
            </div>
            <div class="welcome-message">
              <h2 style="color: #007BFF; font-weight: bold; font-size: 24px; text-align: center; margin-bottom: 20px;">Welcome to Our Site!</h2>
              <p style="font-size: 16px; margin-bottom: 20px;">Hello ${first_name + " " + last_name},</p>
              <p style="font-size: 16px; margin-bottom: 20px;">Thank you for joining our site! We are excited to have you on board.</p>
              <!-- Add more content as needed -->
              <p style="font-size: 16px; margin-bottom: 20px;">Feel free to explore and enjoy our platform.</p>
              <p style="font-size: 16px; margin-bottom: 20px;">Best regards,</p>
              <p style="font-size: 16px;">Your Site Team</p>
            </div>
            <div class="action-button">
              <a class="btn-primary" href="link_to_your_site" style="font-size: 16px; text-decoration: none;">Get Started</a>
            </div>
            <div class="footer" style="margin-top: 30px;">
              <p style="font-size: 12px; color: #777;">This email was sent automatically. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending welcome email:', error);
      } else {
        console.log('Welcome email sent:', info.response);
      }
    });

    res.json({ message: "Account created successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};


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