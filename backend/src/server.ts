require("dotenv").config();
import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type TodoItem = {
  title: string;
  description: string;
  id: number;
};

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryResult = await pool.query(
      "SELECT * FROM todoItems ORDER BY id ASC"
    );
    const todos: TodoItem[] = queryResult.rows;
    res.status(200).json({ todos });
  } catch (error) {
    console.log("Error!", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

app.get("/todos", getTodos);
//app.post('/todos', addTodos);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
