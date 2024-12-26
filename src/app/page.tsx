'use client';

import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいTODOを入力"
          className="border p-2 flex-1"
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{todo}</span>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
