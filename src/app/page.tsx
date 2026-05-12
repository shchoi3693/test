'use client';

import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const { userId, isInitialized } = useAuthStore();
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col">
        <button onClick={() => handleLogout()}>Logout</button>
        {!isInitialized ? (
          <>Loading</>
        ) : userId ? (
          <>
            <h1>AAA</h1>
            <Link href="/playlist">A</Link>
          </>
        ) : (
          <>
            <h1>Not Log</h1>
            <Link href="/login">B</Link>
          </>
        )}
      </main>
    </div>
  );
}
