'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://api.bloomingsparrow.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user, data.token);
        router.push('/');
      } else {
        setError(data.error);
        setLoading(false);
      }
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <main className="inner-page">
      <div className="max-w-md mx-auto mt-12 bg-white p-8 border border-[#e8dcc4] rounded shadow-sm">
        <h1 className="page-title text-center mb-6">Create Account</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile No</label>
            <div className="mt-1 flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-gray-900 transition-colors bg-white">
              <span className="px-3 bg-gray-50 border-r border-gray-300 text-gray-500 font-medium py-2">+91</span>
              <input type="tel" required pattern="[0-9]{10}" maxLength={10} value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} className="w-full p-2 outline-none" placeholder="10-digit number" title="Please enter exactly 10 digits" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative border border-gray-300 rounded overflow-hidden focus-within:border-gray-900 transition-colors bg-white">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 pr-10 outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#1c1c1c] text-white py-2.5 rounded mt-4 flex justify-center items-center gap-2 disabled:opacity-75 transition-all">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-[#a46e3e]">Sign In</Link>
        </p>
      </div>
    </main>
  );
}
