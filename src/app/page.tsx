'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">ホームページ</h1>
      <p>以下のページへ移動できます：</p>
      <ul className="list-disc pl-5">
        <li>
          <Link href="/login" className="text-blue-500 hover:underline">
            ログインページ
          </Link>
        </li>
        <li>
          <Link href="/todos" className="text-blue-500 hover:underline">
            TODOリストページ
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-blue-500 hover:underline">
            お問い合わせページ
          </Link>
        </li>
      </ul>
    </main>
  );
}
