import express from "express";
import { UserController } from "../controller/userController";
import { SubjectController } from "../controller/subjectController";
import { TaskController } from "../controller/taskController";
import { TodoController } from "../controller/todoController";

const router = express.Router();

// User routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/:role', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Subject routes
router.post('/subjects', SubjectController.createSubject);
router.get('/subjects', SubjectController.getSubjects);
router.get('/subjects/:id', SubjectController.getSubjectById);
router.put('/subjects/:id', SubjectController.updateSubject);
router.delete('/subjects/:id', SubjectController.deleteSubject);

// Task routes
router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

// Todo routes
router.post('/todos', TodoController.createTodo);
router.get('/todos', TodoController.getTodos);
router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;
