import React, { useState } from 'react';
import TodoAdd from './TodoAdd';

interface Todo {
  id: number;
  text: string;
}

interface TodoDeleteProps {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
}

const TodoDelete: React.FC<TodoDeleteProps> = ({todos, deleteTodo,}) => {
    const handleDelete = (todo: Todo) =>
        {
            deleteTodo(todo);
        }

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleDelete(todo)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )    
}

export default TodoDelete;