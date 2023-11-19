import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-100">
      <div className="w-full max-w-xs">
        <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => {
          e.preventDefault();
          handleLogin(e.target.email.value, e.target.password.value);
        }}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                       border-zinc-300 dark:border-zinc-700 dark:bg-zinc-100  text-zinc-700" 
              id="email" 
              type="email" 
              placeholder="Email"
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                       border-zinc-300 dark:border-zinc-700 dark:bg-zinc-100  text-zinc-700" 
              id="password" 
              type="password" 
              placeholder="Password"
              required 
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <p className="text-center text-xs hover:underline cursor-pointer">
          <a href='https://dawes.cc'>dawes.cc</a>
        </p>
      </div>
    </div>
  );
}

