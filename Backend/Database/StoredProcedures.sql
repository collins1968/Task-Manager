-- stored procedures

-- register a new user
CREATE PROCEDURE CreateUser
    @first_name VARCHAR(50),
	@last_name VARCHAR(50),
    @email VARCHAR(100),
    @password VARCHAR(100),
	@role VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [User] (first_name, last_name, email, password, role, created_at, updated_at)
    VALUES (@first_name, @last_name, @email, @password, @role, GETDATE(), GETDATE());
END

drop procedure CreateUser

-- get users 
 CREATE PROCEDURE GetUsers 
 AS
 BEGIN
 SELECT * FROM [USER]
 END;

--get user where email is the email

CREATE PROCEDURE GetUser 
  @email VARCHAR(100)
 AS
 BEGIN
 SELECT * FROM [USER] WHERE email = @email
 END;
--gettasks
CREATE PROCEDURE GetTasks 
AS
BEGIN 
SELECT * FROM Task
END;

-- create New task
CREATE PROCEDURE CreateTask
    @title VARCHAR(100),
    @description VARCHAR(255),
    @due_date DATETIME,
    @priority VARCHAR(20),
    @status VARCHAR(20),
    @created_by INT,
	@project_id INT,
	@start_date DATETIME,
    @task_id INT OUTPUT -- Add the output parameter for task_id
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Task (title, description, due_date, priority, status, start_date, project_id, created_by, created_at, updated_at)
    VALUES (@title, @description, @due_date, @priority, @status, @start_date, @project_id, @created_by, GETDATE(), GETDATE());

    -- Set the output parameter task_id to the newly inserted task_id
    SET @task_id = SCOPE_IDENTITY();
END

 -- assign task to users
CREATE PROCEDURE AssignTaskToUsers
    @task_id INT,
    @user_ids VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Split the comma-separated user IDs into individual values
    DECLARE @user_table TABLE (user_id INT);
    INSERT INTO @user_table (user_id)
    SELECT value
    FROM STRING_SPLIT(@user_ids, ',');

    -- Insert the task-user mappings for each user
    INSERT INTO TaskUser (task_id, user_id)
    SELECT @task_id, user_id
    FROM @user_table;
END

EXEC AssignTaskToUsers @task_id = 1002 , @user_ids = '1004, 1005'


-- get all tasks assigned to a user
CREATE PROCEDURE GetTasksByUserId
  @user_id INT
AS
BEGIN
  SELECT T.*
  FROM TaskUser TU
  JOIN Task T ON TU.task_id = T.task_id
  WHERE TU.user_id = @user_id;
END;

--deleting a task
CREATE PROCEDURE DeleteTask
    @task_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the task exists
    IF NOT EXISTS (SELECT 1 FROM Task WHERE task_id = @task_id)
    BEGIN
        RAISERROR ('Task not found.', 16, 1);
        RETURN;
    END;

    -- Delete the task
    DELETE FROM Task WHERE task_id = @task_id;

    -- Delete associated task-user mappings
    DELETE FROM TaskUser WHERE task_id = @task_id;

    -- Delete associated dependencies
    DELETE FROM Dependency WHERE task_id = @task_id OR dependent_task_id = @task_id;

    -- Delete associated task labels
    DELETE FROM TaskLabel WHERE task_id = @task_id;

    -- Delete associated attachments
    DELETE FROM Attachment WHERE task_id = @task_id;

    -- Delete associated comments
    DELETE FROM Comment WHERE task_id = @task_id;

    -- Return success message
    SELECT 'Task deleted successfully.' AS [Message];
END

--execute delete task procedure
EXEC DeleteTask 2019

-- get task by id
CREATE PROCEDURE GetTaskById
    @task_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the task exists
    IF NOT EXISTS (SELECT 1 FROM Task WHERE task_id = @task_id)
    BEGIN
        RAISERROR ('Task not found.', 16, 1);
        RETURN;
    END;

    -- Retrieve the task information
    SELECT *
    FROM Task
    WHERE task_id = @task_id;
END

--execute getTsaskById
EXEC GetTaskById @task_id = 2014

-- update a certain task
CREATE PROCEDURE UpdateTask
  @task_id INT,
  @title VARCHAR(100),
  @description VARCHAR(255),
  @due_date DATETIME,
  @priority VARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE Task
  SET
    title = @title,
    description = @description,
    due_date = @due_date,
    priority = @priority,
    updated_at = GETDATE()
  WHERE task_id = @task_id;
END

drop procedure UpdateTask

select * from comment

--add a comment to a task
CREATE PROCEDURE AddComment
    @task_id INT,
    @user_id INT,
    @content VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the task exists
    IF NOT EXISTS (SELECT 1 FROM Task WHERE task_id = @task_id)
    BEGIN
        RAISERROR ('Task not found.', 16, 1);
        RETURN;
    END;

    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM [User] WHERE user_id = @user_id)
    BEGIN
        RAISERROR ('User not found.', 16, 1);
        RETURN;
    END;

    -- Insert the new comment
    INSERT INTO Comment (task_id, user_id, content, created_at)
    VALUES (@task_id, @user_id, @content, GETDATE());
END

-- execute add comment
EXEC AddComment 2015, 1005, 'great work';

--drop procedure addComment
drop procedure AddComment


-- get comments by taskId
CREATE PROCEDURE GetCommentsByTaskId
    @task_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the task exists
    IF NOT EXISTS (SELECT 1 FROM Task WHERE task_id = @task_id)
    BEGIN
        RAISERROR ('Task not found.', 16, 1);
        RETURN;
    END;

    -- Retrieve comments for the specified task
    SELECT c.comment_id, c.content, c.created_at, u.first_name+ ' ' + last_name as user_name
    FROM Comment c
    INNER JOIN [User] u ON c.user_id = u.user_id
    WHERE c.task_id = @task_id;
END

EXEC GetCommentsByTaskId 2015;

drop procedure GetCommentsByTaskId

-- get projects 
CREATE PROCEDURE GetProjects
AS
BEGIN
SELECT * FROM Project
END;


-- change the status of the task
CREATE PROCEDURE ChangeTaskStatus
    @task_id INT,
    @status VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the task exists
    IF NOT EXISTS (SELECT 1 FROM Task WHERE task_id = @task_id)
    BEGIN
        RAISERROR ('Task not found.', 16, 1);
        RETURN;
    END;

    -- Update the task status
    UPDATE Task
    SET status = @status
    WHERE task_id = @task_id;

    -- Return success message
    SELECT 'Task status changed successfully.' AS [Message];
END

--filter task by priority
CREATE PROCEDURE FilterTasksByPriority
    @priority VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Task
    WHERE priority = @priority;
END

--filter task by project
CREATE PROCEDURE FilterTasksByProjectName
    @project_name VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT T.*
    FROM Task T
    INNER JOIN Project P ON T.project_id = P.project_id
    WHERE P.title = @project_name;
END


--filter task by status
CREATE PROCEDURE FilterTasksByStatus
    @status VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Task
    WHERE status = @status;
END
-- get statistics for project
CREATE PROCEDURE GetProjectStatistics
    @project_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Variables to store the statistics
	DECLARE @TotalTasksCount INT;
    DECLARE @CompletedTasks INT;
    DECLARE @TasksInProgress INT;
    DECLARE @OpenTasks INT;
    DECLARE @MediumPriorityTasks INT;
    DECLARE @LowPriorityTasks INT;
    DECLARE @HighPriorityTasks INT;
	

	 -- Get the total count of all tasks
    SELECT @TotalTasksCount = COUNT(*) 
    FROM Task
    WHERE project_id = @project_id;
    -- Get the number of completed tasks for the project
    SELECT @CompletedTasks = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND status = 'Completed';

    -- Get the number of tasks in progress for the project
    SELECT @TasksInProgress = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND status = 'In Progress';

    -- Get the number of open tasks for the project
    SELECT @OpenTasks = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND status = 'Open';

    -- Get the number of tasks with medium priority for the project
    SELECT @MediumPriorityTasks = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND priority = 'Medium';

    -- Get the number of tasks with low priority for the project
    SELECT @LowPriorityTasks = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND priority = 'Low';

    -- Get the number of tasks with high priority for the project
    SELECT @HighPriorityTasks = COUNT(*)
    FROM Task
    WHERE project_id = @project_id AND priority = 'High';

    -- Return the statistics as a result set
    SELECT 
		@TotalTasksCount AS TotalTasks,
        @CompletedTasks AS CompletedTasks,
        @TasksInProgress AS TasksInProgress,
        @OpenTasks AS OpenTasks,
        @MediumPriorityTasks AS MediumPriorityTasks,
        @LowPriorityTasks AS LowPriorityTasks,
        @HighPriorityTasks AS HighPriorityTasks;
END

CREATE PROCEDURE FilterTasks
  @project_name NVARCHAR(100) = NULL,
  @priority NVARCHAR(50) = NULL,
  @status NVARCHAR(50) = NULL
AS
BEGIN
  SELECT *
  FROM Task T
  INNER JOIN Project P ON T.project_id = P.project_id
  WHERE
    (@project_name IS NULL OR p.project_title = @project_name)
    AND (@priority IS NULL OR priority = @priority)
    AND (@status IS NULL OR status = @status)
END



