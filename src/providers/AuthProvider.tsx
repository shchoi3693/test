'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createClient());
  const { setUserId, setInitialized } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
      setInitialized(true);
    });
    return () => subscription.unsubscribe();
  }, [setUserId, supabase]);

  return <>{children}</>;
}
