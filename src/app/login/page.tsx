'use client';

import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { useEffect, useState } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
      setIsLoaded(true);
    };
    checkUser();
  }, [supabase, router]);

  if (!isLoaded) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#2d2d2d',
              },
            },
          },
        }}
        providers={[]}
        localization={{
          variables: {
            sign_in: {
              email_label: '이메일 주소',
              password_label: '비밀번호',
              button_label: '로그인하기',
            },
            sign_up: {
              button_label: '회원가입하기',
            },
          },
        }}
      />
    </div>
  );
}
