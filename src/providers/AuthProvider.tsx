'use client';

import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { ReactNode, useEffect } from 'react';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { setUserId } = useAuthStore();
  useEffect(() => {
    const initUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    initUser();

    // Auth 상태 변화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });
    return () => subscription.unsubscribe();
  }, [setUserId, supabase]);

  return <>{children}</>;
}
