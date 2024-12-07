import { Task } from "../models/userSchema";


export class TaskController {
    static async createTask(req: any, res: any) {
        try {
            const task = new Task(req.body);
            await task.save();
            res.status(201).json(task);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getTasks(req: any, res: any) {
        try {
            const tasks = await Task.find().populate('user');
            res.status(200).json(tasks);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getTaskById(req: any, res: any) {
        try {
            const task = await Task.findById(req.params.id).populate('user');
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json(task);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateTask(req: any, res: any) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json(task);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteTask(req: any, res: any) {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }
}
