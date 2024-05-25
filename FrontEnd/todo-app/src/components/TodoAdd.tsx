import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

const [todos, setTodos] = useState<Todo[]>([]); 

interface TodoAddProps {
  addTodo: (todo: Todo) => void;
}

const TodoAdd: React.FC<TodoAddProps> = ({ addTodo }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const TodoID = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newTodo: Todo = {
      id: TodoID + 1,
      text: inputText
    };
    addTodo(newTodo);
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Todo"
        value={inputText}
        onChange={handleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoAdd;
