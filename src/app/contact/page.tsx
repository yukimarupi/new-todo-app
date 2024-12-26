/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError('全てのフィールドを入力してください。');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccess('問い合わせが送信されました！');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('送信中にエラーが発生しました。');
      }
    } catch (err) {
      setError('送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">お名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">お問い合わせ内容</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 w-full h-24"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          送信
        </button>
      </form>
    </main>
  );
}
