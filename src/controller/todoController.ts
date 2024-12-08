import { Todo } from '../models/userSchema';

export class TodoController {
    static async createTodo(req: any, res: any) {
        try {
            const { name, status } = req.body;

            // Validate required fields
            if (!name || !status) {
                return res.status(400).json({ error: 'Both name and status are required' });
            }

            // Validate that the status is one of the allowed values
            const validStatuses = ['TO_DO', 'IN_PROGRESS', 'COMPLETED'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
            }

            // Create the Todo and save it
            const todo = new Todo({
                name,
                status,
            });
            await todo.save();

            res.status(201).json(todo); // Return the created todo with a 201 status
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the todo', message: err.message });
        }
    }

    static async getTodos(req: any, res: any) {
        try {
            const todos = await Todo.find();
            res.status(200).json(todos);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getTodoById(req: any, res: any) {
        try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json(todo);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateTodo(req: any, res: any) {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json(todo);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteTodo(req: any, res: any) {
        try {
            const todo = await Todo.findByIdAndDelete(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
