'use client';

import { useState } from 'react';

export default function Home() {
  const [chapter, setChapter] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [adult, setAdult] = useState(true);

  const getComments = async () => {
    setLoading(true);
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapter, adult })
    });
    const data = await res.json();
    setComments(prev => [...prev, ...data.comments]);
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Левая колонка — текст */}
      <div className="w-7/12 p-10 overflow-y-auto bg-amber-50">
        <h1 className="text-4xl font-bold mb-8 text-amber-900">
          Преступление и наказание
        </h1>
        <div className="text-lg leading-8 prose max-w-none">
          <p className="italic text-amber-700">Глава {chapter + 1}</p>
          <div className="bg-white p-8 rounded-lg shadow-lg min-h-96">
            {/* Здесь будет настоящий текст — пока заглушка */}
            {chapter === 5 && (
              <p className="text-red-800 font-bold">
                «Я убил не старуху, я убил принцип!» — крикнул он вдруг...
              </p>
            )}
            <p className="mt-8 text-gray-600">
              Нажми «Следующая глава», чтобы персонажи заговорили...
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setChapter(c => c + 1);
            getComments();
          }}
          className="mt-8 px-8 py-4 bg-red-900 text-white rounded-lg hover:bg-red-800 text-xl"
        >
          Следующая глава →
        </button>
      </div>

      {/* Правая колонка — живые голоса */}
      <div className="w-5/12 bg-gray-900 text-gray-100 p-8 overflow-y-auto">
        <h2 className="text-3xl mb-6 flex items-center gap-3">
          Голоса из книги
          {loading && <span className="text-sm">печатают...</span>}
        </h2>

        <div className="space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="bg-gray-800 p-5 rounded-lg border border-red-900">
              {c}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={adult}
              onChange={e => setAdult(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-red-400 text-xl">Режим 18+</span>
          </label>
        </div>
      </div>
    </div>
  );
}
