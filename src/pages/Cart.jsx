import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  const shipping = cart.length > 0 ? 15.00 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax + shipping;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-3d');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, [cart]);

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        @keyframes premiumPulse {
          0% { box-shadow: 0 0 0 0 rgba(160, 120, 85, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(160, 120, 85, 0); }
          100% { box-shadow: 0 0 0 0 rgba(160, 120, 85, 0); }
        }
        .checkout-pulse-btn {
          animation: premiumPulse 2s infinite;
          transition: all 0.3s ease;
        }
        .checkout-pulse-btn:hover {
          transform: translateY(-2px);
          background: #8A6546 !important;
        }
      `}</style>
      {/* Background Dynamics */}
      <div className="bg-blob-warm animate-rotate-slow" style={{ position: 'fixed', top: '-10%', right: '10%', width: '600px', height: '600px', zIndex: 0 }}></div>
      <div className="bg-blob-warm animate-morph" style={{ position: 'fixed', bottom: '10%', left: '10%', width: '400px', height: '400px', zIndex: 0, opacity: 0.3 }}></div>

      <div className="container relative py-24" style={{ zIndex: 1 }}>
        {/* Header Section */}
        <div className="reveal-3d active" style={{ marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Your Selection</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: '"Playfair Display", serif', color: '#2D2621' }}>
            Shopping <span style={{ fontStyle: 'italic', color: '#A07855' }}>Cart</span>
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#A07855', margin: '2rem 0' }}></div>
        </div>

        {cart.length === 0 ? (
          <div className="reveal-3d glass-premium p-16 text-center" style={{ borderRadius: '12px' }}>
             <ShoppingBag size={48} style={{ color: '#A07855', marginBottom: '1.5rem', margin: '0 auto' }} />
             <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2D2621' }}>Your cart is empty</h2>
             <p className="text-muted mb-12" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>Discover our latest collection of adaptive handcrafted fashion.</p>
             <Link to="/products" className="btn" style={{ background: '#2D2621', color: '#fff', padding: '1.2rem 3rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>START SHOPPING</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Cart Items List */}
            <div className="flex flex-col gap-8">
              {cart.map((item, idx) => (
                <div key={item.id} className="reveal-3d" style={{ transitionDelay: `${idx * 0.1}s` }}>
                   <div className="glass-premium item-row" style={{ border: 'none' }}>
                      <div className="perspective-container item-img-container" style={{ width: '100px', height: '130px', flexShrink: 0 }}>
                         <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      </div>
                      
                      <div className="flex flex-col justify-between flex-1 py-1">
                         <div>
                            <div className="flex justify-between items-start">
                               <div>
                                  <span style={{ fontSize: '0.7rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.1em' }}>{item.category || 'BOUTIQUE'}</span>
                                  <h3 style={{ fontSize: '1.2rem', fontWeight: 500, margin: '0.5rem 0' }}>{item.name}</h3>
                               </div>
                               <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#A07855', cursor: 'pointer', padding: '0.5rem' }}>
                                  <Trash2 size={18} />
                                </button>
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2D2621' }}>ETB {item.price.toFixed(2)}</div>
                         </div>

                         <div className="flex items-center gap-6 mt-6">
                            <div className="flex items-center gap-4 bg-white" style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid rgba(160, 120, 85, 0.2)' }}>
                               <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                               <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginLeft: 'auto', color: '#A07855' }}>ETB {(item.price * item.quantity).toFixed(2)}</div>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="reveal-3d" style={{ position: 'sticky', top: '120px' }}>
               <div className="glass-premium" style={{ padding: '3rem', borderRadius: '16px', background: 'linear-gradient(180deg, #2D2621 0%, #1a1613 100%)', color: '#fff', border: '1px solid rgba(160,120,85,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ fontSize: '1.8rem', fontFamily: '"Playfair Display", serif', marginBottom: '2.5rem' }}>Order Summary</h3>
                  
                  <div className="flex flex-col gap-4 mb-8 pt-4">
                     <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                        <span>Subtotal</span>
                        <span style={{ fontWeight: 500 }}>ETB {cartTotal.toFixed(2)}</span>
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

                  <Link to="/checkout" className="btn checkout-pulse-btn" style={{ 
                     background: '#A07855', 
                     color: '#fff', 
                     padding: '1.5rem', 
                     borderRadius: '8px', 
                     width: '100%', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     gap: '12px',
                     textDecoration: 'none',
                     fontWeight: 700,
                     letterSpacing: '0.15em',
                     marginTop: '1rem',
                     fontSize: '1rem'
                  }}>
                     CHECKOUT NOW <ArrowRight size={22} />
                  </Link>

                  <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                     256-bit Secure Encryption
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
