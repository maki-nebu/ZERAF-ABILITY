import { useState, useEffect } from 'react';
import { Filter, ChevronDown, List, Grid, ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

import { getDb } from '../data/mockDb';

const extractCategories = (products) => {
  const cats = new Set(products.map(p => p.category.toUpperCase()));
  return ["ALL", ...Array.from(cats)];
};

export default function Products() {
  const [view, setView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem('zeraf_auth')) {
      navigate('/login');
    }
  }, [navigate]);
  
  const ALL_PRODUCTS = getDb().products;
  const CATEGORIES = extractCategories(ALL_PRODUCTS);
  
  const filteredProducts = activeCategory === 'ALL' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category.toUpperCase() === activeCategory);

  const handleAddToCart = (p) => {
    addToCart(p);
    setShowToast(p.name);
    setTimeout(() => setShowToast(null), 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-3d');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, [activeCategory]);

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Dynamics */}
      <div className="bg-blob-warm animate-rotate-slow" style={{ position: 'fixed', top: '10%', right: '-10%', width: '700px', height: '700px', zIndex: 0 }}></div>
      <div className="bg-blob-warm animate-morph" style={{ position: 'fixed', bottom: '10%', left: '-10%', width: '500px', height: '500px', zIndex: 0, opacity: 0.4 }}></div>

      <div className="container relative py-20" style={{ zIndex: 1, maxWidth: '1080px' }}>
        {/* Header Section */}
        <div className="reveal-3d active" style={{ marginBottom: '6rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>Accessible Boutique</span>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: '"Playfair Display", serif', color: '#2D2621' }}>
            Adaptive <span style={{ fontStyle: 'italic', color: '#A07855' }}>Design</span>
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#A07855', margin: '2rem 0' }}></div>
        </div>

        {/* Sorting & Filters Bar */}
        <div className="flex items-center justify-between mb-12 glass-premium" style={{ padding: '1.5rem 2rem', borderRadius: '12px', minHeight: '80px' }}>
          <div className="flex items-center" style={{ 
            display: 'flex',
            gap: '2.5rem', 
            overflowX: 'auto', 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingRight: '2rem'
          }}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: activeCategory === cat ? '#A07855' : 'rgba(45, 38, 33, 0.4)',
                  cursor: 'pointer',
                  padding: '8px 4px',
                  borderBottom: activeCategory === cat ? '2px solid #A07855' : '2px solid transparent',
                  transition: '0.3s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => setView('grid')} style={{ padding: '0.5rem', background: view === 'grid' ? '#A07855' : 'transparent', color: view === 'grid' ? '#fff' : '#2D2621', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
               <Grid size={20} />
            </button>
            <button onClick={() => setView('list')} style={{ padding: '0.5rem', background: view === 'list' ? '#A07855' : 'transparent', color: view === 'list' ? '#fff' : '#2D2621', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
               <List size={20} />
            </button>
          </div>
        </div>

        {/* Main Shop Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr', gap: '1.5rem' }}>
          {filteredProducts.map((product, idx) => (
            <div key={product.id} className="reveal-3d" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="perspective-container">
                 <div className="animate-float-3d" style={{ position: 'relative', transition: 'all 0.5s ease' }}>
                    <div className="glass-premium" style={{ padding: '0.5rem', border: 'none', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(160, 120, 85, 0.15)' }}>
                       {/* Product Image */}
                       <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(160, 120, 85, 0.4)', opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <button 
                                onClick={() => setSelectedProduct(product)}
                                style={{ background: '#fff', color: '#A07855', padding: '1rem 2rem', border: 'none', borderRadius: '40px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer' }}
                              >
                                QUICK VIEW
                              </button>
                          </div>
                       </div>

                       {/* Product Info */}
                       <div style={{ padding: '2rem 1.5rem' }}>
                          <div className="flex items-center justify-between mb-4">
                             <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07855' }}>{product.category}</span>
                             <span style={{ fontSize: '1.25rem', fontWeight: 500, fontFamily: '"Playfair Display", serif' }}>${product.price.toFixed(2)}</span>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 400, color: '#2D2621', marginBottom: '1.5rem', lineHeight: '1.4' }}>{product.name}</h3>
                          
                          <button 
                             onClick={() => handleAddToCart(product)}
                             style={{ 
                             width: '100%', 
                             background: '#2D2621', 
                             color: '#fff', 
                             padding: '1.1rem', 
                             border: 'none', 
                             borderRadius: '4px', 
                             fontWeight: 600, 
                             letterSpacing: '0.05em',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             gap: '12px',
                             cursor: 'pointer',
                             transition: '0.3s'
                          }}
                          className="btn-add-cart"
                          >
                             <ShoppingBag size={18} /> ADD TO CART
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boutique Pagination - Visual Flow */}
        <div className="flex justify-center mt-16 gap-12 reveal-3d">
          <div className="flex items-center gap-6">
             <button style={{ background: 'none', border: 'none', color: '#2d2621', opacity: 0.3, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', cursor: 'not-allowed' }}>PREV</button>
             <div className="flex items-center gap-3">
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.1em' }}>01</span>
                <div style={{ width: '60px', height: '1px', background: 'rgba(45, 38, 33, 0.1)' }}>
                    <div style={{ width: '30%', height: '100%', background: '#A07855' }}></div>
                </div>
                <span style={{ fontSize: '0.85rem', opacity: 0.4, letterSpacing: '0.1em' }}>04</span>
             </div>
             <button style={{ background: 'none', border: 'none', color: '#A07855', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', cursor: 'pointer' }}>NEXT</button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
           <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedProduct(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={24} />
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                 <div style={{ height: '500px' }}>
                    <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ padding: '4rem 3rem' }}>
                    <span style={{ color: '#A07855', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em' }}>{selectedProduct.category}</span>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: '"Playfair Display", serif', margin: '1rem 0' }}>{selectedProduct.name}</h2>
                    <div style={{ fontSize: '2rem', color: '#2D2621', marginBottom: '2rem' }}>${selectedProduct.price.toFixed(2)}</div>
                    <p style={{ color: 'rgba(45, 38, 33, 0.6)', lineHeight: '1.8', marginBottom: '3rem' }}>{selectedProduct.description}</p>
                    
                    <button 
                      onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                      style={{ background: '#2D2621', color: 'white', width: '100%', padding: '1.5rem', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                    >
                      <ShoppingBag size={20} /> PURCHASE NOW
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
           <CheckCircle2 size={24} color="#A07855" />
           <div>
              <div style={{ fontWeight: 700 }}>Added to Boutique</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{showToast}</div>
           </div>
        </div>
      )}
    </div>
  );
}
