 -- create database TASKMANAGER
CREATE DATABASE projectmanager
-- Create the User table
CREATE TABLE [User] (
  user_id INT IDENTITY(1,1) PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

ALTER TABLE [User]
ADD username VARCHAR(50);

select * from [user]

INSERT INTO [User] ( name, email, password, created_at, updated_at)
VALUES
  ( 'John Doe', 'johndoe@example.com', 'password123', GETDATE(), GETDATE()),
  ( 'Jane Smith', 'janesmith@example.com', 'securepassword', GETDATE(), GETDATE());

select * from[User]

-- Create the Project table
CREATE TABLE Project (
  project_id INT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);
drop table project

-- Create the Task table
CREATE TABLE Task (
  task_id INT IDENTITY(1,1) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  due_date DATETIME,
  priority VARCHAR(20),
  status VARCHAR(20) NOT NULL,
  created_by INT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (created_by) REFERENCES [User](user_id)
);

drop table task

INSERT INTO Task ( title, description, due_date, priority, status, created_by, created_at, updated_at)
VALUES
  ( 'Dummy Task 1', 'This is a dummy task.', '2023-07-01', 1, 'In Progress', 1, GETDATE(), GETDATE()),
  ( 'Dummy Task 2', 'This is another dummy task.', '2023-07-02', 2, 'Pending', 1, GETDATE(), GETDATE());

select * from task

-- Create the TaskUser table
CREATE TABLE TaskUser (
  task_user_id INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  user_id INT,
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (user_id) REFERENCES [User](user_id)
);

select * from taskUser

-- Create the Dependency table
CREATE TABLE Dependency (
  dependency_id INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  dependent_task_id INT,
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (dependent_task_id) REFERENCES Task(task_id)
);

-- Create the Label table
CREATE TABLE Label (
  label_id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Create the TaskLabel table
CREATE TABLE TaskLabel (
  task_label_id INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  label_id INT,
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (label_id) REFERENCES Label(label_id)
);

-- Create the Attachment table
CREATE TABLE Attachment (
  attachment_id INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  file_name VARCHAR(100) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (task_id) REFERENCES Task(task_id)
);

-- Create the Comment table
CREATE TABLE Comment (
  comment_id INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  user_id INT,
  content VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (user_id) REFERENCES [User](user_id)
);



