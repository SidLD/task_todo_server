import { Todo } from '../models/userSchema';

export class TodoController {
    static async createTodo(req: any, res: any) {
        try {
            const todo = new Todo(req.body);
            await todo.save();
            res.status(201).json(todo);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getTodos(req: any, res: any) {
        try {
            const todos = await Todo.find();
            res.status(200).json(todos);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getTodoById(req: any, res: any) {
        try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json(todo);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateTodo(req: any, res: any) {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json(todo);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteTodo(req: any, res: any) {
        try {
            const todo = await Todo.findByIdAndDelete(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }
}
