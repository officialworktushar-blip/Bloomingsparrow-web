'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';
import ProductImage from '@/components/ProductImage';

export default function CheckoutPage() {
  const { cart, user, token, removeFromCart, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<string>('new');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    number: ''
  });
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

  useEffect(() => {
    if (!user || !token) return;
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://api.bloomingsparrow.com/api/payment/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        const addresses: any[] = [];
        data.forEach((order: any) => {
          if (order.shipping_address) {
            const exists = addresses.some(a => a.street === order.shipping_address.street && a.pincode === order.shipping_address.pincode);
            if (!exists) addresses.push(order.shipping_address);
          }
        });
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          setSelectedAddressIndex('0');
          setAddress(addresses[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user, token]);

  const selectAddress = (val: string) => {
    setSelectedAddressIndex(val);
    setIsDropdownOpen(false);
    if (val !== 'new') {
      setAddress(savedAddresses[parseInt(val)]);
    } else {
      setAddress({ street: '', city: '', state: '', pincode: '', number: '' });
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      Swal.fire({
        title: 'Please login first to place an order.',
        icon: 'warning'
      });
      router.push('/login');
      return;
    }
    
    if (!address.street || !address.city || !address.state || !address.pincode || !address.number) {
      Swal.fire({
        title: 'Incomplete Address',
        text: 'Please fill out all address fields before proceeding.',
        icon: 'warning'
      });
      return;
    }

    
    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await fetch('https://api.bloomingsparrow.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: totalAmount, items: cart, shippingAddress: address })
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
          const verifyRes = await fetch('https://api.bloomingsparrow.com/api/payment/verify', {
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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm border border-[#e8e7d5]">
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
                    <ProductImage src={item.image} alt={item.title} className="w-12 aspect-[3/4] object-cover rounded" loading="lazy" />
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

              <div className="mt-8">
                <h2 className="text-xl font-semibold border-b pb-2 mb-4">Shipping Address</h2>
                {savedAddresses.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select a Saved Address</label>
                    <div className="relative">
                      <div 
                        className="w-full p-3 border border-gray-300 rounded cursor-pointer flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="truncate pr-4 font-medium text-gray-800">
                          {selectedAddressIndex === 'new' 
                            ? 'Add New Address' 
                            : `${savedAddresses[parseInt(selectedAddressIndex)].street}, ${savedAddresses[parseInt(selectedAddressIndex)].city} - ${savedAddresses[parseInt(selectedAddressIndex)].pincode}`
                          }
                        </span>
                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                      
                      {isDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-xl max-h-72 overflow-y-auto">
                            <div 
                              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                              onClick={() => selectAddress('new')}
                            >
                              <span className="font-semibold text-[#252525]">Add New Address</span>
                            </div>
                            {savedAddresses.map((addr, idx) => (
                              <div 
                                key={idx} 
                                className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedAddressIndex === idx.toString() ? 'bg-gray-50 border-l-4 border-l-[#252525]' : 'border-l-4 border-l-transparent'}`}
                                onClick={() => selectAddress(idx.toString())}
                              >
                                <div className="font-semibold text-gray-900">{addr.street}</div>
                                <div className="text-sm text-gray-600 mt-1">{addr.city}, {addr.state} - {addr.pincode}</div>
                                <div className="text-sm text-gray-500 mt-0.5">Ph: {addr.number}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-[#287379] focus:border-[#287379]" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-[#287379] focus:border-[#287379]" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-[#287379] focus:border-[#287379]" placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input type="text" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-[#287379] focus:border-[#287379]" placeholder="Pincode" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-[#287379] focus:border-[#287379]" placeholder="10-digit number" />
                    </div>
                  </div>
                </div>
              </div>
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
                className="w-full bg-[#252525] text-white py-3 rounded text-lg font-medium hover:bg-black transition-colors"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
