import { CreateTask, GetTasks, getTasksByUserId, DeleteTask, updateTask, GetProjects, getCommentsByTaskId, AddComment, GetTaskById, ChangeTaskStatus, filterTasksByPriority, filterTasksByStatus, filterTasksByProjectName, getProjectStatistics, filterTasks } from "../Controllers/taskController.js";
import VerifyToken from "../utils/VerifyToken.js";

const TaskRoute = (app) => {
    app.route('/tasks')
    .get(VerifyToken, GetTasks)
    .post(VerifyToken, CreateTask)
    app.route('/task')
    .get(VerifyToken, getTasksByUserId)
    app.route('/task/:task_id')
    .get(VerifyToken, GetTaskById)
    .delete(VerifyToken, DeleteTask)
    .put(VerifyToken, updateTask)
    .patch(VerifyToken, ChangeTaskStatus)
    app.route('/task/:task_id/comment')
     .get(VerifyToken, getCommentsByTaskId)
     .post(VerifyToken, AddComment)
    app.route('/projects')
    .get(VerifyToken, GetProjects)
    app.route('/tasks/priority')
    .get(VerifyToken, filterTasksByPriority )
    app.route('/tasks/status')
    .get(VerifyToken, filterTasksByStatus )
    app.route('/tasks/:project_name')
    .get(VerifyToken, filterTasksByProjectName)
    app.route('/projects/:project_id')
    .get(VerifyToken, getProjectStatistics)
    app.route('/AllTasks')
    .get(VerifyToken, filterTasks)
} 

export default TaskRoute