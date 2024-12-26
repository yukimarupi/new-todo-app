'use client'; //クライアントサイドコンポーネントの宣言

import { useState, useEffect } from 'react'; //必要なReactのフックをインポート

export default function TodoApp() {
  //状態の定義
  const [todos, setTodos] = useState<string[]>([]); //現在のToDoリストを格納する
  const [newTodo, setNewTodo] = useState<string>(''); //新しいToDoを入力する

  //ローカルストレージからのデータの取得
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  //ToDoの追加処理
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  //ToDoの削除処理
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  //UIの構築
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいTODOを入力"
          className="border p-2 flex-1 text-black placeholder-gray-500"
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{todo}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))
        ) : (
          <p>TODOがありません。</p>
        )}
      </ul>
    </main>
  );
}
