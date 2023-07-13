import { CreateTask, GetTasks, getTasksByUserId, DeleteTask, updateTask } from "../Controllers/taskController.js";
import VerifyToken from "../utils/VerifyToken.js";


const TaskRoute = (app) => {
    app.route('/tasks')
    .get(VerifyToken, GetTasks)
    app.route('/task')
    .post(VerifyToken, CreateTask)
    .get(VerifyToken, getTasksByUserId)
    app.route('/task/:task_id')
    .delete(VerifyToken, DeleteTask)
    .put(VerifyToken, updateTask)
    app.route('/task/:task_id/comments')
    .get(VerifyToken, getCommentsByTaskId)
}

export default TaskRoute