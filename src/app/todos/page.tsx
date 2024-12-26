// /app/todos/page.tsx
'use client'; // クライアントサイドコンポーネントの宣言

import { useState, useEffect } from 'react'; // 必要なReactのフックをインポート
import { useRouter } from 'next/navigation'; // ルーターをインポート
import AuthGuard from '../authGuard';

export default function TodoApp() {
  // 状態の定義
  const [todos, setTodos] = useState<string[]>([]); // 現在のToDoリストを格納する
  const [newTodo, setNewTodo] = useState<string>(''); // 新しいToDoを入力する
  const [isEditing, setIsEditing] = useState<number | null>(null); // 編集中のToDoのインデックス
  const [editTodo, setEditTodo] = useState<string>(''); // 編集する内容

  const router = useRouter(); // Next.jsのルーター

  // ローカルストレージからのデータの取得
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // ToDoの追加処理
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodo('');
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // ローカルストレージを更新
  };

  // ToDoの削除処理
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // ローカルストレージを更新
  };

  // 編集モードを開始する処理
  const startEditing = (index: number) => {
    setIsEditing(index);
    setEditTodo(todos[index]);
  };

  // 編集内容を保存する処理
  const saveTodo = (index: number) => {
    if (editTodo.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[index] = editTodo;
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditTodo('');
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // ローカルストレージを更新
  };

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // ログイン状態を解除
    router.push('/login'); // ログインページにリダイレクト
  };

  // 編集モードをキャンセルする処理
  const cancelEditing = () => {
    setIsEditing(null);
    setEditTodo('');
  };

  // UIの構築
  return (
    <AuthGuard>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
        >
          ログアウト
        </button>
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
                {isEditing === index ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editTodo}
                      onChange={(e) => setEditTodo(e.target.value)}
                      className="border p-2 flex-1 text-black"
                    />
                    <button
                      onClick={() => saveTodo(index)}
                      className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      保存
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      キャンセル
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>{todo}</span>
                    <div>
                      <button
                        onClick={() => startEditing(index)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTodo(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>TODOがありません。</p>
          )}
        </ul>
      </main>
    </AuthGuard>
  );
}
