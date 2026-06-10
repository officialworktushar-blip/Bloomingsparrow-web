'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user, data.token);
        router.push('/');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Server error');
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
          <button type="submit" className="w-full bg-[#1c1c1c] text-white py-2 rounded mt-4">Sign In</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link href="/register" className="text-[#a46e3e]">Register here</Link>
        </p>
      </div>
    </main>
  );
}
