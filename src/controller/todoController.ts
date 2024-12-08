import { Task, Todo } from '../models/userSchema';
import { ITask, ITodo } from '../util/interface';

export class TodoController {
    // Create a new Todo and link it to a Task
    static async createTodo(req: any, res: any) {
        try {
            const { name, status, taskId } = req.body;

            // Validate required fields
            if (!name || !status || !taskId) {
                return res.status(400).json({ error: 'Name, status, and taskId are required' });
            }

            // Validate that the status is one of the allowed values
            const validStatuses = ['TO_DO', 'IN_PROGRESS', 'COMPLETED'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
            }

            // Create the Todo
            const todo = new Todo({
                name,
                status,
            });
            await todo.save();

            // Add the Todo to the Task's 'todo' array
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            let todos:any = task.todo;
            // Push the new Todo to the task's todo array and save the Task
            todos.push(todo._id);
            task.todo = todos;
            await task.save();

            res.status(201).json(todo); // Return the created todo with a 201 status
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the todo', message: err.message });
        }
    }

    // Get all Todos associated with a specific Task (user-specific task)
    static async getTodos(req: any, res: any) {
        try {
            const tasks: ITask | null = await Task.findOne({ user: req.user.id }).populate('todo');
            if (tasks) {
                const todos = tasks.todo; // Access the todo array from the populated task
                res.status(200).json(todos); // Return the todos if found
            } else {
                res.status(200).json([]); // If no task is found, return an empty array
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get all Todos associated with a specific Task by Task ID
    static async getTodoById(req: any, res: any) {
        try {
            const { id } = req.params;
            const task: ITask | null = await Task.findById(id).populate('todo');
            if (task) {
                const todos = task.todo; // Access the todo array from the populated task
                res.status(200).json(todos); // Return the todos if found
            } else {
                res.status(200).json([]); // If no task is found, return an empty array
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    // Update a Todo associated with a Task
    static async updateTodo(req: any, res: any) {
        try {
            const { id } = req.params;
            const { name, status } = req.body;

            // Validate status
            const validStatuses = ['TO_DO', 'IN_PROGRESS', 'COMPLETED'];
            if (status && !validStatuses.includes(status)) {
                return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
            }

            const todo = await Todo.findById(id);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            // Update the Todo fields
            if (name) todo.name = name;
            if (status) todo.status = status;

            await todo.save();

            res.status(200).json(todo); // Return the updated todo
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete a Todo associated with a Task
    static async deleteTodo(req: any, res: any) {
        try {
            const { id } = req.params;

            // Find and delete the Todo
            const todo = await Todo.findByIdAndDelete(id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });

            // Remove the Todo from the associated Task's todo array
            const task = await Task.findOne({ todo: id });
            if (task) {
                task.todo = task.todo.filter((todoId) => todoId.toString() !== id);
                await task.save();
            }

            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
