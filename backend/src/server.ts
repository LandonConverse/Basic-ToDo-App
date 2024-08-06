import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type TodoItem = {
  title: string;
  description: string;
  id?: number;
};

const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryResult = await pool.query(
      "SELECT * FROM todo_item ORDER BY id ASC"
    );
    const todos: TodoItem[] = queryResult.rows;
    res.status(200).json({ todos });
  } catch (error) {
    console.log("Error!", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
    const { title, description }: TodoItem = req.body;
  
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
  
    try {
      const result = await pool.query(
        "INSERT INTO todo_item (title, description) VALUES ($1, $2) RETURNING *",
        [title, description]
      );
      const newTodo: TodoItem = result.rows[0];
      res.status(201).json({ todo: newTodo });
    } catch (error) {
      console.log("Error!", error);
      res.status(500).json({ error: "Failed to create todo" });
    }
  };


app.get("/todos", getTodo);
app.post("/todos", createTodo)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
