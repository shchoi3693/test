'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function Home() {
  const { userId } = useAuthStore();
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col">
        {userId ? (
          <>
            <h1>AAA</h1>
            <Link href="/playlists">A</Link>
          </>
        ) : (
          <>
            <h1>Text</h1>
            <Link href="/login">B</Link>
          </>
        )}
      </main>
    </div>
  );
}
