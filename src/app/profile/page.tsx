'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';

export default function ProfilePage() {
  const { user, logout, token } = useStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      router.push('/login');
    }
  }, [isClient, user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;
      try {
        const res = await fetch('https://api.bloomingsparrow.com/api/payment/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (isClient && user) {
      fetchOrders();
    }
  }, [isClient, user, token]);

  const latestAddress = orders.length > 0 ? orders[0].shipping_address : null;

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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h2 className="font-serif text-[1.8rem] mb-6 text-gray-900 border-b pb-2">Saved Address</h2>
          {latestAddress ? (
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100">
              <p className="text-gray-800 font-medium">{latestAddress.street}</p>
              <p className="text-gray-600 mt-1">{latestAddress.city}, {latestAddress.state} - {latestAddress.pincode}</p>
              <p className="text-gray-600 mt-1">Phone: {latestAddress.number}</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-[20px] p-6 border border-gray-100 text-gray-500">
              No saved address found. Add one during checkout.
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h2 className="font-serif text-[1.8rem] mb-6 text-gray-900 border-b pb-2">Order History</h2>
          {loadingOrders ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-white rounded-[20px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100">
                  <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <div>
                      <span className="text-sm text-gray-500">Order ID: {order.razorpay_order_id}</span>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <p className="font-medium mt-1">₹{order.amount}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                        <img src={`/${item.image}`} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-[20px] p-6 border border-gray-100 text-gray-500">
              You haven't placed any orders yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
