import { useState, useEffect } from 'react';
import { Filter, ChevronDown, List, Grid, ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { getDb } from '../data/mockDb';

const extractCategories = (products) => {
  const cats = new Set(products.map(p => p.category.toUpperCase()));
  return ["ALL", ...Array.from(cats)];
};

export default function Products() {
  const [view, setView] = useState('grid');
  const [activeCategories, setActiveCategories] = useState([]);
  const [priceMax, setPriceMax] = useState(500);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const { addToCart } = useCart();
  
  const ALL_PRODUCTS = getDb().products;
  const CATEGORIES = extractCategories(ALL_PRODUCTS).filter(c => c !== 'ALL');
  
  const toggleCategory = (cat) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setActiveCategories([]);
    setPriceMax(500);
    setSelectedSizes([]);
  };
  
  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchCat = activeCategories.length === 0 || activeCategories.includes(p.category.toUpperCase());
    const matchPrice = p.price <= priceMax;
    const matchSize = selectedSizes.length === 0 || (p.sizes || []).some(s => selectedSizes.includes(s));
    return matchCat && matchPrice && matchSize;
  });

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
  }, [activeCategories]);

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

        {/* Layout Grid */}
        <div className="grid-account">
           {/* Filter Sidebar */}
           <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <button 
                onClick={clearAllFilters} 
                style={{ background: 'transparent', border: '1px solid #ccc', color: '#666', padding: '0.8rem', width: '100%', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '500' }}>
                Clear All
              </button>

              <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '2rem' }}>
                <div className="flex justify-between items-center mb-4">
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Categories</h3>
                   <ChevronDown size={18} />
                </div>
                <div className="flex flex-col gap-3">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input 
                         type="checkbox" 
                         checked={activeCategories.includes(cat)} 
                         onChange={() => toggleCategory(cat)} 
                         style={{ accentColor: '#2D2621', width: '16px', height: '16px' }} 
                      />
                      <span style={{ color: '#666', fontSize: '0.95rem', textTransform: 'capitalize' }}>{cat.toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '2rem' }}>
                <div className="flex justify-between items-center mb-4">
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Price Range</h3>
                   <ChevronDown size={18} />
                </div>
                <div style={{ height: '4px', background: '#e2e2e2', borderRadius: '4px', position: 'relative', margin: '2rem 0 1rem' }}>
                   <div style={{ position: 'absolute', left: 0, height: '100%', width: `${(priceMax/500)*100}%`, background: '#2D2621', borderRadius: '4px' }}></div>
                </div>
                <input 
                   type="range" min="0" max="500" value={priceMax} 
                   onChange={(e) => setPriceMax(parseInt(e.target.value))} 
                   style={{ width: '100%', position: 'absolute', transform: 'translateY(-2rem)', opacity: 0, cursor: 'pointer' }} 
                />
                <div className="flex justify-between" style={{ color: '#888', fontSize: '0.9rem' }}>
                  <span>ETB 0</span><span>ETB {priceMax}</span>
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '2rem' }}>
                <div className="flex justify-between items-center mb-4">
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Sizes</h3>
                   <ChevronDown size={18} />
                </div>
                <div className="flex flex-col gap-3">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input 
                         type="checkbox" 
                         checked={selectedSizes.includes(size)} 
                         onChange={() => toggleSize(size)} 
                         style={{ accentColor: '#2D2621', width: '16px', height: '16px' }} 
                      />
                      <span style={{ color: '#666', fontSize: '0.95rem' }}>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
           </aside>

           {/* Main Shop Filter Results */}
           <div>
              <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: '1px solid rgba(160,120,85,0.1)' }}>
                 <p style={{ color: '#555', fontSize: '0.9rem' }}>Showing {filteredProducts.length} results</p>
                 <div className="flex gap-4">
                    <button onClick={() => setView('grid')} style={{ padding: '0.5rem', background: view === 'grid' ? '#A07855' : 'transparent', color: view === 'grid' ? '#fff' : '#2D2621', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                       <Grid size={20} />
                    </button>
                    <button onClick={() => setView('list')} style={{ padding: '0.5rem', background: view === 'list' ? '#A07855' : 'transparent', color: view === 'list' ? '#fff' : '#2D2621', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                       <List size={20} />
                    </button>
                 </div>
              </div>
              
              <div className={view === 'grid' ? "products-grid" : "products-list"}>
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
                             <span style={{ fontSize: '1.25rem', fontWeight: 500, fontFamily: '"Playfair Display", serif' }}>ETB {product.price.toFixed(2)}</span>
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
        
           </div> {/* Closes right column */}
        </div>    {/* Closes grid-account */}

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
                    <div style={{ fontSize: '2rem', color: '#2D2621', marginBottom: '2rem' }}>ETB {selectedProduct.price.toFixed(2)}</div>
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
