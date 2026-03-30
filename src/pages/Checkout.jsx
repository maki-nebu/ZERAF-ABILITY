import { useState, useEffect } from 'react';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getDb } from '../data/mockDb';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [method, setMethod] = useState('telebirr');
  
  // Simulate pre-filling data from the logged-in user's account session
  const [formData, setFormData] = useState({ 
    firstName: 'Sarah', 
    lastName: 'Jenkins', 
    email: 'sarah.j@example.com', 
    address: '445 Heritage Avenue, Suite 2B', 
    city: 'Addis Ababa', 
    phone: '0911234567' 
  });
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('zeraf_auth')) {
      navigate('/login');
    }
  }, [navigate]);

  const subtotal = cartTotal;
  const shipping = cart.length > 0 ? 15.00 : 0;
  const tax = cart.length > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!formData.firstName || !formData.email) {
      alert("Please enter your name and email.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const db = getDb();
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customer: `${formData.firstName} ${formData.lastName}`.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: parseFloat(total.toFixed(2)),
      status: 'Processing',
      product: cart[0]?.name + (cart.length > 1 ? ` (+${cart.length - 1})` : '')
    };

    const updatedDb = { ...db, orders: [newOrder, ...(db.orders || [])] };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(updatedDb));
    
    clearCart();
    alert(`✓ Order placed successfully! Your reference is ${newOrder.id}.`);
    navigate('/home');
  };
  
  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', padding: '6rem 0' }}>
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes premiumPulse {
          0% { box-shadow: 0 0 0 0 rgba(160, 120, 85, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(160, 120, 85, 0); }
          100% { box-shadow: 0 0 0 0 rgba(160, 120, 85, 0); }
        }
        @keyframes subtleFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .input-premium {
          background: transparent !important;
          border: none !important;
          border-bottom: 2px solid rgba(160,120,85,0.2) !important;
          border-radius: 0 !important;
          padding: 0.5rem 0 !important;
          font-size: 1.1rem;
          color: #2D2621 !important;
          transition: all 0.3s ease;
          width: 100%;
        }
        .input-premium:focus {
          outline: none !important;
          border-bottom: 2px solid #A07855 !important;
        }
        .animated-panel-1 {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animated-panel-2 {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.15s;
          opacity: 0;
        }
        .animated-panel-3 {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        .payment-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .payment-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .submit-order-btn {
          animation: premiumPulse 2s infinite;
          transition: all 0.3s ease;
        }
        .submit-order-btn:hover {
          transform: translateY(-2px);
          background: #8A6546 !important;
        }
        .review-card-img {
          animation: subtleFloat 6s ease-in-out infinite;
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px' }}>
        <div className="animated-panel-1" style={{ marginBottom: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#A07855', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem', background: '#f5f2ef', padding: '0.4rem 1rem', borderRadius: '20px' }}>
            Secure Checkout
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: '0.5rem 0' }}>
            Finalize <span style={{ fontStyle: 'italic', color: '#A07855' }}>Order</span>
          </h1>
          <p style={{ color: '#666', maxWidth: '500px', fontSize: '0.95rem', lineHeight: '1.6', margin: '1rem 0 0' }}>
            Please review your shipping details and select your preferred payment method below to complete your exclusive purchase.
          </p>
          <div style={{ width: '60px', height: '2px', background: '#A07855', margin: '2.5rem auto 0' }}></div>
        </div>
        
        <div className="grid-checkout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Shipping Info */}
            <div className="glass-premium animated-panel-1" style={{ borderRadius: '16px', background: 'rgba(255, 255, 255, 0.7)', padding: '3rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: '"Playfair Display", serif' }}>
                <Truck size={28} color="#A07855" strokeWidth={1.5} /> Shipping Directory
              </h3>
              <div className="grid-responsive-2" style={{ marginBottom: '2rem' }}>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>First Name</label>
                  <input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} type="text" className="input-premium" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Last Name</label>
                  <input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} type="text" className="input-premium" placeholder="Doe" />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-8">
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" className="input-premium" placeholder="john.doe@example.com" />
              </div>
              <div className="flex flex-col gap-1 mb-8">
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Street Address</label>
                <input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} type="text" className="input-premium" placeholder="123 Fashion Way" />
              </div>
              <div className="grid-responsive-3">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>City</label>
                  <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} type="text" className="input-premium" placeholder="Addis Ababa" />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Country</label>
                  <input type="text" value="Ethiopia" disabled className="input-premium" style={{ color: '#999 !important' }} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</label>
                  <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="text" className="input-premium" placeholder="0900000000" />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="glass-premium animated-panel-2" style={{ borderRadius: '16px', background: 'rgba(255, 255, 255, 0.7)', padding: '3rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: '"Playfair Display", serif' }}>
                <CreditCard size={28} color="#A07855" strokeWidth={1.5} /> Secure Payment
              </h3>
              
              <div className="flex gap-4 mb-8 flex-wrap">
                <button 
                  className="payment-btn flex-1"
                  onClick={() => setMethod('telebirr')}
                  style={{ padding: '1.2rem', background: method === 'telebirr' ? 'linear-gradient(135deg, #00A1E0 0%, #007bb5 100%)' : 'rgba(255,255,255,0.8)', color: method === 'telebirr' ? 'white' : '#00A1E0', border: method === 'telebirr' ? 'none' : '1px solid #00A1E0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, minWidth: '120px' }}
                >
                  Telebirr
                </button>
                <button 
                  className="payment-btn flex-1"
                  onClick={() => setMethod('cbe')}
                  style={{ padding: '1.2rem', background: method === 'cbe' ? 'linear-gradient(135deg, #6E3C8A 0%, #4a275d 100%)' : 'rgba(255,255,255,0.8)', color: method === 'cbe' ? 'white' : '#6E3C8A', border: method === 'cbe' ? 'none' : '1px solid #6E3C8A', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, minWidth: '120px' }}
                >
                  CBE Mobile
                </button>
                <button 
                  className="payment-btn flex-1"
                  onClick={() => setMethod('card')}
                  style={{ padding: '1.2rem', background: method === 'card' ? 'linear-gradient(135deg, #2D2621 0%, #1a1613 100%)' : 'rgba(255,255,255,0.8)', color: method === 'card' ? 'white' : '#2D2621', border: method === 'card' ? 'none' : '1px solid #2D2621', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, minWidth: '120px' }}
                >
                  Credit Card
                </button>
                <button 
                  className="payment-btn flex-1"
                  onClick={() => setMethod('cod')}
                  style={{ padding: '1.2rem', background: method === 'cod' ? 'linear-gradient(135deg, #16a34a 0%, #0f7635 100%)' : 'rgba(255,255,255,0.8)', color: method === 'cod' ? 'white' : '#16a34a', border: method === 'cod' ? 'none' : '1px solid #16a34a', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, minWidth: '120px' }}
                >
                  Pay on Delivery
                </button>
              </div>

              {method === 'telebirr' && (
                <div className="animate-fade-in flex flex-col gap-4 p-6 border border-solid border-blue-200 rounded-md bg-blue-50">
                  <p style={{ color: '#00A1E0', fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem', textAlign: 'center' }}>Telebirr Direct</p>
                  <p style={{ color: '#555', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>Enter your Telebirr mobile number. A payment prompt will be sent to your phone.</p>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00A1E0', textTransform: 'uppercase' }}>Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ background: 'white', border: '1px solid rgba(0, 161, 224, 0.4)', padding: '0.8rem', borderRadius: '4px', fontSize: '1rem' }} placeholder="0900 000 000" />
                  </div>
                </div>
              )}

              {method === 'cbe' && (
                <div className="animate-fade-in flex flex-col items-center justify-center p-6 border border-solid border-purple-200 rounded-md bg-purple-50 text-center">
                  <p style={{ color: '#6E3C8A', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Commercial Bank of Ethiopia</p>
                  <p style={{ color: '#555', fontSize: '0.9rem' }}>Please transfer <strong>ETB {total.toFixed(2)}</strong> to account <strong>1000123456789</strong>.</p>
                  <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.5rem' }}>Use your order code as the payment reference. We will process your order once verified.</p>
                </div>
              )}
              
              {method === 'card' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Card Number</label>
                    <input type="text" className="input-premium" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid-responsive-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expiration Date</label>
                      <input type="text" className="input-premium" placeholder="MM/YY" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CVC</label>
                      <input type="text" className="input-premium" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {method === 'cod' && (
                <div className="animate-fade-in flex flex-col items-center justify-center p-6 border border-dashed border-green-300 rounded-md bg-green-50 text-center">
                  <p style={{ color: '#16a34a', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>No upfront payment required.</p>
                  <p style={{ color: '#555', fontSize: '0.9rem' }}>You can pay in cash or via mobile transfer when your package arrives.</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Review Sticky Sidebar */}
          <div>
            <div className="glass-premium animated-panel-3" style={{ position: 'sticky', top: '120px', padding: '3rem', borderRadius: '16px', background: 'linear-gradient(180deg, #2D2621 0%, #1a1613 100%)', color: '#fff', border: '1px solid rgba(160,120,85,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1.8rem', fontFamily: '"Playfair Display", serif', marginBottom: '2.5rem', color: '#fff' }}>Order Summary</h3>
              
              <div className="flex flex-col gap-5 mb-8">
                {cart.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Your cart is empty.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="review-card-img" style={{ width: '70px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(160,120,85,0.3)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: '1.3' }}>{item.name}</h4>
                        <p style={{ color: '#A07855', fontWeight: 700, marginTop: '0.4rem', fontSize: '1.1rem' }}>ETB {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex flex-col gap-4 mb-8 pt-4">
                <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 500 }}>ETB {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  <span>Shipping</span>
                  <span style={{ fontWeight: 500 }}>ETB {shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  <span>Tax</span>
                  <span style={{ fontWeight: 500 }}>ETB {tax.toFixed(2)}</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(160,120,85,0.3)', margin: '1.5rem 0' }}></div>
                <div className="flex justify-between items-center" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                  <span>Total</span>
                  <span style={{ color: '#A07855' }}>ETB {total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="submit-order-btn"
                onClick={handlePlaceOrder}
                style={{ 
                  background: '#A07855', 
                  color: '#fff', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px',
                  border: 'none',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}>
                CONFIRM ORDER <ShieldCheck size={22} />
              </button>
              <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={14} /> 256-bit Secure Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
