'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';

export default function CheckoutPage() {
  const { cart, user, token, removeFromCart, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalAmount = cart.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0);

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      Swal.fire({
        title: 'Please login first to place an order.',
        icon: 'warning'
      });
      router.push('/login');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: totalAmount, items: cart })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      // 2. Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Blooming Sparrow",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            Swal.fire({
              title: 'Payment successful!',
              icon: 'success'
            });
            clearCart();
            router.push('/');
          } else {
            Swal.fire({
              title: 'Payment verification failed.',
              icon: 'error'
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#aa3bff"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        Swal.fire({
          title: 'Payment Failed',
          text: response.error.description,
          icon: 'error'
        });
      });
      rzp.open();
    } catch (err: any) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 pb-16 max-w-[860px] mx-auto w-full">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm border border-[#e8dcc4]">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-4">
                    <img src={`/${item.image}`} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.numericPrice * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm mt-1">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4 mb-6">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
              
              <button 
                onClick={handleCheckout} 
                disabled={loading}
                className="w-full bg-[#1c1c1c] text-white py-3 rounded text-lg font-medium hover:bg-black transition-colors"
              >
                {loading ? 'Processing...' : 'Pay with Razorpay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
