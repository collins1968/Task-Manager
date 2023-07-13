import sql from 'mssql'
import config from '../db/config.js';
import { Connection } from '../utils/dbHelpers.js';

const db = new Connection();
 
// create a new task
export const CreateTask = async (req, res) => {
    try {
      const { title, description, due_date, priority, status } = req.body;
      const created_by = req.user.userId; // Assuming the user ID is stored in `id` property of `user.params`
  
      // Call the stored procedure to create the task
      await db.executeProcedure("CreateTask", {
        title,
        description,
        due_date,
        priority,
        status,
        created_by
      });
  
      res.json({ message: "Task created successfully" });
    } catch (error) {
      res.json({ error: error.message });
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

    // const tasks = result.recordset;

    res.json(result.recordset);
  } catch (error) {
    res.json({ error: error.message });
  }
};

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
    const { task_id} = req.params;
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
    const { task_id, comment } = req.body;
    const user_id = req.user.userId; // Assuming user_id is stored in req.user.user_id

    await db.executeProcedure("AddComment", { task_id, comment, user_id });
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






