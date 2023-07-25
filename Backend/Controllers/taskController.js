import { Connection } from '../utils/dbHelpers.js';
import nodeMailer from 'nodemailer';
import config from '../db/config.js';


const {mail_password} = config;

const db = new Connection();

// const task_id = taskResult.insertId; // Assuming the stored procedure returns the inserted task ID
    
export const CreateTask = async (req, res) => {
  try {
    const { title, description, due_date, priority, status, assigned_users, project_id, start_date } = req.body;
    const created_by = req.user.userId;
    const taskStatus = status || "Open";

    // Create the task and get the task_id
    const task_id = await db.executeProcedureWithOutput("CreateTask", {
      title,
      description,
      due_date,
      priority,
      status: taskStatus,
      created_by,
      project_id,
      start_date
    });

    // Assign the task to users
    if (assigned_users && assigned_users.length > 0) {
      await db.executeProcedure("AssignTaskToUsers", {
        task_id,
        user_ids: assigned_users
      });
      // Fetch assigned user emails
      const assignedUserEmails = await db.executeProcedure("getAssignedUserEmails", { task_id });
      console.log('Assigned User Emails:', assignedUserEmails.recordset);
      // Extract email addresses from the result
      const emailAddresses = assignedUserEmails.recordset.map(user => user.email);

      // Set up Nodemailer transport configuration
      const transporter = nodeMailer.createTransport({
        service: "gmail",
      auth: {
        user: "collinsmwendwa1968@gmail.com",
        pass: mail_password,
      },
      });

      // Your email message details (subject, text, etc.)
      const mailOptions = {
        from: 'collinsmwendwa1968@gmail.com', // Sender address
        to: emailAddresses.join(','), // Comma-separated list of email addresses
        subject: 'Task Assignment',
       // HTML email content using the template
       html: `
       <!DOCTYPE html>
       <html>
       <head>
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Task Assignment</title>
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
       
           /* Style the task details section */
           .task-details {
             margin-bottom: 20px;
           }
       
           /* Style the task details list */
           .task-details ul {
             list-style: none;
             padding-left: 0;
           }
       
           /* Add a border and padding to the task details list items */
           .task-details li {
             border-bottom: 1px solid #ccc;
             padding: 10px 0;
           }
       
           /* Style the button with a nice gradient background */
           .btn-primary {
             display: inline-block;
             padding: 10px 20px;
             background: linear-gradient(135deg, #007BFF 0%, #00BCD4 100%);
             color: #fff;
             text-decoration: none;
             border-radius: 4px;
           }
       
           /* Center the button */
           .action-button {
             text-align: center;
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
           <div class="task-details">
             <h2 style="color: #007BFF; font-weight: bold; font-size: 24px; text-align: center;">Task Assignment</h2>
             <p>Hello,</p>
             <p style="font-size: 16px;">You have been assigned a new task.</p>
             <p style="font-size: 16px; margin-bottom: 10px;">Task Details:</p>
             <ul>
               <li><strong>Title:</strong> ${title}</li>
               <li><strong>Description:</strong> ${description}</li>
               <li><strong>Priority:</strong> ${priority}</li>
               <li><strong>Due Date:</strong> ${due_date}</li>
             </ul>
           </div>
           <div class="action-button">
             <a class="btn-primary" href="link_to_task" style="font-size: 16px; text-decoration: none;">View Task</a>
           </div>
           <div class="footer" style="margin-top: 30px;">
             <p style="font-size: 12px; color: #777;">This email was sent automatically. Please do not reply.</p>
           </div>
         </div>
       </body>
       </html>
       
     `,
   };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
    
    res.json({ message: "Task created and assigned to users successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get tasks
export const GetTasks = async( req, res) => {
    try {
        const result = await db.executeProcedure("GetTasks")
        !result.recordset[0] ? res.status(404).json({ message: 'tasks not found' }):
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json({ error: error.message });
    }
}

//assign task to a person
export const assignTaskToUsers = async (req, res) => {
  try {
    const { task_id, user_ids } = req.body;

    await db.executeProcedure('AssignTaskToUsers', {
      task_id,
      user_ids,
    });
    res.json({ message: 'Task assigned to users successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get tasks by user_id
export const getTasksByUserId = async (req, res) => {
  try {
    // const user_id  = req.params.id;
    const user_id = req.user.userId; // Assuming user_id is stored in req.user.user_id
    // Call the stored procedure to get tasks by user ID
    const result = await db.executeProcedure('GetTasksByUserId', {
      user_id,
    });
    !result.recordset[0] ? res.status(404).json({ message: 'no tasks assigned currently' }):
    res.json(result.recordset);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//get a sinngle task by id 
export const GetTaskById = async (req, res) =>{
  try {
    const userId = req.user.userId;
    const {task_id} = req.params
    const result = await db.executeProcedure("GetTaskById", { task_id });
    res.status(200).json(result.recordset);
  } catch (error) {
    res.json({error: error.message})
  }
}
//delete a task
export const DeleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const userId = req.user.userId;

    // Check if the user is the creator of the task
    const task = await db.executeProcedure("GetTaskById", { task_id });
    const createdBy = task.recordset[0].created_by;
    if (createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Only the task creator can delete the task." });
    }

    // Delete the task if the user is the creator
    await db.executeProcedure("DeleteTask", { task_id });
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a task
export const updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const userId = req.user.userId;
    const { title, description, due_date, priority } = req.body;
    
    // Check if the user is the creator of the task
    const task = await db.executeProcedure("GetTaskById", { task_id });
    const createdBy = task.recordset[0].created_by;
    //const userId = req.user.user_id; // Assuming user_id is stored in req.user
    
    if (createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Only the task creator can update the task." });
    }
    
    // Update the task if the user is the creator
    await db.executeProcedure("UpdateTask", { task_id, title, description, due_date, priority });
    res.json({ message: "Task updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//add a comment to a task
export const AddComment = async (req, res) => {
  try {
    const {task_id} = req.params;
    const { content } = req.body;
    const user_id = req.user.userId;
    await db.executeProcedure("AddComment", { task_id, content, user_id });
    res.json({ message: "Comment added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//get comments by task_id
export const getCommentsByTaskId = async (req, res) => {
  try {
    const { task_id } = req.params;
    const result = await db.executeProcedure("GetCommentsByTaskId", { task_id });
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//get projects
export const GetProjects = async (req, res) => {
  try {
      const result = await db.executeProcedure("GetProjects")
      !result.recordset[0] ? res.status(404).json({ message: 'projects not found' }):
      res.status(200).json(result.recordset);
  } catch (error) {
      res.status(201).json({ error: error.message });
  }
}

export const ChangeTaskStatus = async (req, res) => {
  try {
    const {task_id} = req.params;
    const {status} = req.body;
    const user_id = req.user.userId;
    await db.executeProcedure("ChangeTaskStatus", {
      task_id,
      status
    })
    res.json({message: "status updated successfully"})
  } catch (error) {
    res.json({error: error.message})
  }
}

export const filterTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const result = await db.executeProcedure("FilterTasksByPriority", { priority });
    !result.recordset[0] ? res.status(404).json({ message: 'tasks not found' }):
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterTasksByProjectName = async (req, res) => {
  try {
    const { project_name } = req.body;
    const result = await db.executeProcedure("FilterTasksByProjectName", { project_name });
    !result.recordset[0] ? res.status(404).json({ message: 'tasks not found' }):
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterTasksByStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const result = await db.executeProcedure("FilterTasksByStatus", { status });
    !result.recordset[0] ? res.status(404).json({ message: 'tasks not found' }):
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
export const getProjectStatistics = async (req, res) => {
  try {
    const { project_id } = req.params;
    const result = await db.executeProcedure("GetProjectStatistics", { project_id });
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const filterTasks = async (req, res) => {
  try {
    const { project_name, priority, status } = req.query;
    let result;

    // Create an empty object to hold the filtering criteria
    const filters = {};

    // Check if project_name is available and not empty
    if (project_name && project_name.trim() !== '') {
      filters.project_name = project_name.trim();
    }

    // Check if priority is available and not empty
    if (priority && priority.trim() !== '') {
      filters.priority = priority.trim();
    }

    // Check if status is available and not empty
    if (status && status.trim() !== '') {
      filters.status = status.trim();
    }

    if (Object.keys(filters).length > 0) {
      // If any filter option is provided, apply filtering
      result = await db.executeProcedure("FilterTasks", filters);
    } else {
      // If no filter option is provided, fetch all tasks without filtering
      result = await db.executeProcedure("GetTasks");
    }

    if (!result.recordset[0]) {
      return res.status(404).json({ message: error.message });
    }

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








