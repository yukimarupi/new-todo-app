// /app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // ダミーの認証データ
  const dummyUser = { username: 'testuser', password: '123456' };

  const handleLogin = () => {
    if (username === dummyUser.username && password === dummyUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/todos');
    } else {
      setError('ユーザー名またはパスワードが間違っています。');
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名"
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="border p-2 w-full"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ログイン
      </button>
    </main>
  );
}
