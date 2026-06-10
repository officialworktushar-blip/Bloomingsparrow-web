'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';

export default function ProfilePage() {
  const { user, logout } = useStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      router.push('/login');
    }
  }, [isClient, user, router]);

  if (!isClient || !user) {
    return (
      <main className="flex items-center justify-center min-h-[50vh] w-full">
        <div className="animate-spin h-8 w-8 text-[#C8A96E]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        router.push('/');
      }
    });
  };

  return (
    <main className="max-w-[860px] mx-auto p-4 sm:p-8 w-full pt-10">
      <h1 className="font-serif text-[2.4rem] font-normal leading-[1.2] mb-8 text-gray-900 border-b border-gray-200 pb-4">My Profile</h1>
      
      <div className="bg-white rounded-[20px] p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Full Name</h2>
            <p className="text-[1.1rem] font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <h2 className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Email Address</h2>
            <p className="text-[1.1rem] font-medium text-gray-900">{user.email}</p>
          </div>
          {user.role === 'admin' && (
            <div>
              <h2 className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Account Role</h2>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mt-1">
                🛡️ Admin
              </span>
            </div>
          )}
        </div>
        
        <div className="md:w-64 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Manage your account session securely from here.
          </p>
          <button 
            onClick={handleLogout}
            className="w-full h-12 rounded-full bg-white border-[1.5px] border-[#e05252] text-[#e05252] text-sm font-medium transition-all hover:bg-[#e05252] hover:text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
