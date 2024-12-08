import { Task } from "../models/userSchema";
import { User } from "../models/userSchema";

export class TaskController {
    static async createTask(req: any, res: any) {
        try {
            const { user, teacher, startDate, endDate, title, subject } = req.body;

            // Check if all required fields are provided
            if (!user || !teacher || !startDate || !endDate || !subject) {
                return res.status(400).json({ error: 'All fields (user, teacher, startDate, endDate, subject) are required' });
            }

            // Validate that the user and teacher exist in the database
            const userExists = await User.findById(user);
            if (!userExists) {
                return res.status(400).json({ error: 'User not found' });
            }

            const teacherExists = await User.findById(teacher);
            if (!teacherExists) {
                return res.status(400).json({ error: 'Teacher not found' });
            }

            // Ensure that the startDate is before the endDate
            if (new Date(startDate) >= new Date(endDate)) {
                return res.status(400).json({ error: 'startDate must be before endDate' });
            }

            // Create the task and save to database
            const task = new Task({ user, teacher, startDate, endDate, title, subject});
            await task.save();

            res.status(201).json(task); // Return the created task with a 201 status
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the task', message: err.message });
        }
    }

    static async getTasks(req: any, res: any) {
        try {
            const tasks = await Task.find().populate('teacher', '_id firstName lastName middleName title').populate('subject');
            res.status(200).json(tasks);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getTaskById(req: any, res: any) {
        try {
            const task = await Task.findById(req.params.id).populate('user');
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json(task);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateTask(req: any, res: any) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json(task);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteTask(req: any, res: any) {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
