'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://api.bloomingsparrow.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user, data.token);
        router.push('/');
      } else {
        if (data.error === 'User not found') {
          Swal.fire({
            title: 'User does not exist',
            text: 'Redirecting you to the sign up page...',
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            router.push('/register');
          });
        } else {
          setError(data.error);
          setLoading(false);
        }
      }
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <main className="inner-page">
      <div className="max-w-md mx-auto mt-12 bg-white p-8 border border-[#e8dcc4] rounded shadow-sm">
        <h1 className="page-title text-center mb-6">Login</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#1c1c1c] text-white py-2.5 rounded mt-4 flex justify-center items-center gap-2 disabled:opacity-75 transition-all">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link href="/register" className="text-[#a46e3e]">Register here</Link>
        </p>
      </div>
    </main>
  );
}
