import express, { Request, Response } from 'express';
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Todo_db',
    password: 'PJBella2017',
    port: 5432, 
  });

type TodoItem = {
    title: string;
    description: string;
    id: number;
}

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryResult = await pool.query('SELECT * FROM todoItems ORDER BY id ASC')
        const todos: TodoItem[] = queryResult.rows;
        res.status(200).json({ todos })
    } catch (error) {
        console.log("Error!", error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
}



app.get('/todos', getTodos);
//app.post('/todos', addTodos);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});