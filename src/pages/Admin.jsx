import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, LogOut, Search, Bell, Edit, Pencil, Briefcase, TrendingUp, Package, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { getDb, MOCK_DB } from '../data/mockDb';

const PORTFOLIO_DEFAULTS = [
  { id: 1, title: 'The Accessible Runway', category: 'Fashion Show', image: '/image/BER04428.jpg', description: 'Our debut showcase featuring adaptive designs that broke barriers in mainstream fashion weeks.', link: '#' },
  { id: 2, title: 'Everyday Independence', category: 'Lookbook', image: '/image/BER04434.jpg', description: 'A photographic series exploring how magnetic closures and seated cuts empower daily routines.', link: '#' },
  { id: 3, title: 'Artisans of Addis', category: 'Documentary', image: '/image/photo_2026-03-19_02-34-23.jpg', description: "A behind-the-scenes look at the women who handcraft our inclusive collections.", link: '#' },
  { id: 4, title: 'Sensory Comfort Series', category: 'Design Case Study', image: '/image/photo_2026-03-19_02-47-13.jpg', description: 'How we developed tagless, flat-seam garments for neurodivergent individuals.', link: '#' },
];

// NavItem must be outside Admin() to avoid 'component created during render' error
function NavItem({ tab, activeTab, setActiveTab, icon, label }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        width: '100%', textAlign: 'left', padding: '0.8rem 1rem',
        borderRadius: '6px', border: 'none', cursor: 'pointer',
        fontSize: '0.875rem', fontWeight: 600, marginBottom: '2px',
        background: activeTab === tab ? 'rgba(160,120,85,0.15)' : 'transparent',
        color: activeTab === tab ? '#D4A96A' : 'rgba(255,255,255,0.65)',
        borderLeft: activeTab === tab ? '3px solid #A07855' : '3px solid transparent',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// Reusable helpers for the About editor (must be outside Admin())
function Section({ title, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f5f2ef' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }) {
  const style = { width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', lineHeight: '1.6', fontFamily: 'inherit', resize: 'vertical' };
  return (
    <div>
      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>{label}</label>
      {textarea
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} style={style} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={style} />}
    </div>
  );
}

export default function Admin() {
  const { isAdmin, logout, userRole } = useAdminAuth();
  const navigate = useNavigate();
  const db = getDb();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState(db.products || MOCK_DB.products);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', category: '', price: 0, stock: 0, status: 'In Stock', image: '' });
  
  const saveProducts = (updated) => {
    setProducts(updated);
    const saved = { ...getDb(), products: updated };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(saved));
  };
  
  const [customers, setCustomers] = useState(db.customers || MOCK_DB.customers);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({ name: '', email: '', orders: 0, totalSpent: 0 });

  const saveCustomers = (updated) => {
    setCustomers(updated);
    const saved = { ...getDb(), customers: updated };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(saved));
  };

  const [orders] = useState(db.orders || MOCK_DB.orders);
  const [portfolio, setPortfolio] = useState(db.portfolio || MOCK_DB.portfolio || PORTFOLIO_DEFAULTS);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', link: '#', image: '' });
  const [newProjectImage, setNewProjectImage] = useState('');
  const [editingProject, setEditingProject] = useState(null); // holds the project being edited
  const [editImage, setEditImage] = useState('');

  const raw = db.aboutContent || MOCK_DB.aboutContent;
  const [about, setAbout] = useState(raw);
  const [founderImagePreview, setFounderImagePreview] = useState(raw.founderImage);

  const saveAbout = (updated) => {
    setAbout(updated);
    const saved = { ...getDb(), aboutContent: updated };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(saved));
  };

  // Home page sections
  const [homeAbout, setHomeAbout] = useState(db.homeAboutSection || MOCK_DB.homeAboutSection);
  const [homeAboutImage, setHomeAboutImage] = useState((db.homeAboutSection || MOCK_DB.homeAboutSection).image);

  const [collections, setCollections] = useState(db.featuredCollections || MOCK_DB.featuredCollections);
  const [collectionImages, setCollectionImages] = useState(
    (db.featuredCollections || MOCK_DB.featuredCollections).map(c => c.image)
  );

  const [founderSec, setFounderSec] = useState(db.founderSection || MOCK_DB.founderSection);
  const [founderImg1, setFounderImg1] = useState((db.founderSection || MOCK_DB.founderSection).image1);
  const [founderImg2, setFounderImg2] = useState((db.founderSection || MOCK_DB.founderSection).image2);

  const saveHomeSections = () => {
    const updated = {
      ...getDb(),
      homeAboutSection: { ...homeAbout, image: homeAboutImage },
      featuredCollections: collections.map((c, i) => ({ ...c, image: collectionImages[i] || c.image })),
      founderSection: { ...founderSec, image1: founderImg1, image2: founderImg2 },
    };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(updated));
    alert('✓ Home page content published successfully.');
  };

  const savePortfolio = (updated) => {
    setPortfolio(updated);
    const saved = { ...getDb(), portfolio: updated };
    localStorage.setItem('zeraf_mock_db', JSON.stringify(saved));
  };

  const [s1Image, setS1Image] = useState(db.homeContent?.heroSlides?.[0]?.image || MOCK_DB.homeContent.heroSlides[0].image);
  const [s2Image, setS2Image] = useState(db.homeContent?.heroSlides?.[1]?.image || MOCK_DB.homeContent.heroSlides[1].image);
  const [logoImage, setLogoImage] = useState(db.siteLogo || MOCK_DB.siteLogo);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!isAdmin) navigate('/zeraf-secure-portal/login');
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const stats = db.stats || MOCK_DB.stats;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: '260px', minWidth: '260px', background: '#1E1A17',
        display: 'flex', flexDirection: 'column', padding: '0',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {/* Brand */}
        <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', background: '#A07855', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '1.1rem' }}>Z</div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white', letterSpacing: '0.05em', fontFamily: '"Playfair Display", serif' }}>ZERAF</div>
              <div style={{ fontSize: '0.65rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1.5rem 0.75rem', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 0.5rem', marginBottom: '0.5rem' }}>ANALYTICS</p>
          <NavItem tab="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} icon={<LayoutDashboard size={16} />} label="Cockpit Overview" />

          <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 0.5rem', margin: '1.5rem 0 0.5rem' }}>CONTENT</p>
          <NavItem tab="content" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Edit size={16} />} label="Site Content" />
          <NavItem tab="about" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Users size={16} />} label="About Page" />
          <NavItem tab="portfolio" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Briefcase size={16} />} label="Design Portfolio" />

          <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 0.5rem', margin: '1.5rem 0 0.5rem' }}>OPERATIONS</p>
          <NavItem tab="products" activeTab={activeTab} setActiveTab={setActiveTab} icon={<ShoppingBag size={16} />} label="Product Inventory" />
          <NavItem tab="orders" activeTab={activeTab} setActiveTab={setActiveTab} icon={<ShoppingCart size={16} />} label="Customer Orders" />

          <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 0.5rem', margin: '1.5rem 0 0.5rem' }}>SYSTEM</p>
          <NavItem tab="customers" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Users size={16} />} label="Patron Directory" />
          <NavItem tab="settings" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Settings size={16} />} label="Global Settings" />
        </nav>

        {/* User Footer */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', marginBottom: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#A07855', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>SA</div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', margin: 0 }}>{userRole?.replace('_', ' ')}</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Administrator</p>
            </div>
          </div>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.65rem 0.75rem', background: 'transparent', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
            <LogOut size={15} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f6f3', overflow: 'hidden' }}>

        {/* Top Bar */}
        <header style={{ background: 'white', borderBottom: '1px solid #ede9e4', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8f6f3', borderRadius: '8px', padding: '0.5rem 1rem', border: '1px solid #ede9e4' }}>
            <Search size={16} color="#999" />
            <input type="text" placeholder="Search products, orders..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '220px', color: '#333' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #ede9e4', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={16} color="#666" />
            </button>
            <div style={{ width: '36px', height: '36px', background: '#A07855', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>AD</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>

          {/* ── DASHBOARD ── */}
          {activeTab === 'dashboard' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Boutique Overview</p>
                <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Management <span style={{ color: '#A07855', fontStyle: 'italic' }}>Cockpit</span></h1>
              </div>

              {/* KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Total Revenue', value: stats.totalRevenue, icon: <TrendingUp size={18} />, change: '+12.5%', color: '#22c55e' },
                  { label: 'Active Orders', value: stats.activeOrders, icon: <ShoppingCart size={18} />, change: '+4', color: '#3b82f6' },
                  { label: 'Total Customers', value: stats.customersTotal, icon: <Users size={18} />, change: '+38', color: '#8b5cf6' },
                  { label: 'Conversion Rate', value: stats.conversionRate, icon: <Package size={18} />, change: '+0.3%', color: '#f59e0b' },
                ].map((kpi, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #ede9e4', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ width: '38px', height: '38px', background: 'rgba(160,120,85,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A07855' }}>{kpi.icon}</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: kpi.color, background: `${kpi.color}18`, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{kpi.change}</span>
                    </div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.25rem' }}>{kpi.label}</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2D2621', margin: 0 }}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Orders Table */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #ede9e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#2D2621' }}>Recent Transactions</h3>
                  <button onClick={() => setActiveTab('orders')} style={{ fontSize: '0.8rem', color: '#A07855', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}>View all →</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fcfaf8' }}>
                      {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', borderBottom: '1px solid #ede9e4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f2ef' }}>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#A07855' }}>{order.id}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#333' }}>{order.customer}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#666' }}>{order.product}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#2D2621' }}>${order.amount.toFixed(2)}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Shipped' ? '#dbeafe' : '#fef9c3', color: order.status === 'Delivered' ? '#16a34a' : order.status === 'Shipped' ? '#2563eb' : '#854d0e' }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SITE CONTENT (CMS) ── */}
          {activeTab === 'content' && (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Visual Narrative</p>
                <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Content <span style={{ color: '#A07855', fontStyle: 'italic' }}>Orchestrator</span></h1>
              </div>

              {/* About Section on Home */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f2ef' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2D2621' }}>About Section — <span style={{ color: '#A07855' }}>Home Page Banner</span></h3>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '140px', flexShrink: 0 }}>
                    <div style={{ position: 'relative', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ede9e4' }}>
                      <img src={homeAboutImage} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = 0.3} />
                      <label style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.32)', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                        <span style={{ background: '#A07855', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>CHANGE</span>
                        <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => setHomeAboutImage(val))} />
                      </label>
                    </div>
                    <p style={{ fontSize: '0.65rem', color: '#999', textAlign: 'center', marginTop: '0.4rem' }}>About Image</p>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div>
                      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Body Text</label>
                      <textarea value={homeAbout.bodyText} onChange={e => setHomeAbout({ ...homeAbout, bodyText: e.target.value })} rows={3} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical', outline: 'none', lineHeight: '1.6' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Founder Line</label>
                      <textarea value={homeAbout.founderLine} onChange={e => setHomeAbout({ ...homeAbout, founderLine: e.target.value })} rows={2} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical', outline: 'none', lineHeight: '1.6' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Collections */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f2ef' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2D2621' }}>Featured Collections — <span style={{ color: '#A07855' }}>3 Cards</span></h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {collections.map((col, i) => (
                    <div key={col.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem', background: '#fcfaf8', borderRadius: '8px', border: '1px solid #f0ebe4' }}>
                      {/* Image */}
                      <div style={{ width: '120px', flexShrink: 0 }}>
                        <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Card {i + 1}</p>
                        <div style={{ position: 'relative', height: '90px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ede9e4' }}>
                          <img src={collectionImages[i]} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <label style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.32)', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                            <span style={{ background: '#A07855', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>CHANGE</span>
                            <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => { const imgs = [...collectionImages]; imgs[i] = val; setCollectionImages(imgs); })} />
                          </label>
                        </div>
                      </div>
                      {/* Fields */}
                      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Title</label>
                          <input value={col.title} onChange={e => { const c = [...collections]; c[i] = { ...c[i], title: e.target.value }; setCollections(c); }} style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Tag</label>
                          <input value={col.tag} onChange={e => { const c = [...collections]; c[i] = { ...c[i], tag: e.target.value }; setCollections(c); }} style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder Section — 2 images */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f2ef' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2D2621' }}>Founder Section — <span style={{ color: '#A07855' }}>Beza Mengistu (2 Photos)</span></h3>
                </div>
                {[{ img: founderImg1, setImg: setFounderImg1, bioKey: 'bio1', label: 'Photo 1 — Left Block' }, { img: founderImg2, setImg: setFounderImg2, bioKey: 'bio2', label: 'Photo 2 — Right Block' }].map(({ img, setImg, bioKey, label }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem', background: '#fcfaf8', borderRadius: '8px', border: '1px solid #f0ebe4', marginBottom: i === 0 ? '1rem' : 0 }}>
                    <div style={{ width: '130px', flexShrink: 0 }}>
                      <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</p>
                      <div style={{ position: 'relative', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ede9e4' }}>
                        <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = 0.3} />
                        <label style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                          <span style={{ background: '#A07855', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>CHANGE</span>
                          <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => setImg(val))} />
                        </label>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Bio Text</label>
                      <textarea value={founderSec[bioKey]} onChange={e => setFounderSec({ ...founderSec, [bioKey]: e.target.value })} rows={5} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical', outline: 'none', lineHeight: '1.7' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo Section */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f2ef' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2D2621' }}>Brand Identity — <span style={{ color: '#A07855' }}>Hallmark Logo</span></h3>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', background: 'rgba(160,120,85,0.08)', padding: '0.25rem 0.75rem', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sitewide Asset</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ width: '120px', height: '120px', background: '#f8f6f3', borderRadius: '8px', border: '1px solid #ede9e4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', flexShrink: 0 }}>
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.25rem', lineHeight: '1.7' }}>Your hallmark logo appears in the global header on every page. PNG or SVG with transparent background is recommended.</p>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#2D2621', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}>
                      Upload New Logo
                      <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, setLogoImage)} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Hero Slides */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f2ef' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2D2621' }}>Hero Slides — <span style={{ color: '#A07855' }}>Cinematic Narrative</span></h3>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ width: '22px', height: '6px', background: '#A07855', borderRadius: '3px' }}></div>
                    <div style={{ width: '6px', height: '6px', background: '#ddd', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <form onSubmit={e => {
                  e.preventDefault();
                  const f = new FormData(e.target);
                  const updated = {
                    ...db,
                    siteLogo: logoImage,
                    homeContent: {
                      ...db.homeContent,
                      heroSlides: [
                        { image: s1Image, title: f.get('s1_title'), subtitle: f.get('s1_subtitle'), cta: f.get('s1_cta') },
                        { image: s2Image, title: f.get('s2_title'), subtitle: f.get('s2_subtitle'), cta: f.get('s2_cta') },
                      ]
                    }
                  };
                  localStorage.setItem('zeraf_mock_db', JSON.stringify(updated));
                  alert('✓ Storefront updated successfully.');
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {[
                      { label: 'Slide 01 — Primary Aesthetic', img: s1Image, setter: setS1Image, name: 's1', slide: db.homeContent?.heroSlides?.[0] || MOCK_DB.homeContent.heroSlides[0] },
                      { label: 'Slide 02 — Brand Mission', img: s2Image, setter: setS2Image, name: 's2', slide: db.homeContent?.heroSlides?.[1] || MOCK_DB.homeContent.heroSlides[1] },
                    ].map(({ label, img, setter, name, slide }) => (
                      <div key={name} style={{ display: 'flex', gap: '2rem', padding: '1.5rem', background: '#fcfaf8', borderRadius: '8px', border: '1px solid #ede9e4' }}>
                        {/* Image */}
                        <div style={{ flexShrink: 0, width: '280px' }}>
                          <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{label}</p>
                          <div style={{ position: 'relative', height: '180px', borderRadius: '6px', overflow: 'hidden', background: '#eee' }}>
                            <img src={img} alt="slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <label style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.opacity = 1}
                              onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                              <span style={{ background: '#A07855', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>CHANGE PHOTO</span>
                              <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, setter)} />
                            </label>
                          </div>
                        </div>
                        {/* Fields */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Headline</label>
                            <input name={`${name}_title`} defaultValue={slide.title} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.95rem', fontFamily: '"Playfair Display", serif', fontWeight: 600, outline: 'none', color: '#2D2621' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Narrative</label>
                            <textarea name={`${name}_subtitle`} defaultValue={slide.subtitle} rows={3} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', lineHeight: '1.6', resize: 'none', outline: 'none', color: '#555' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Button Text</label>
                            <input name={`${name}_cta`} defaultValue={slide.cta} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', outline: 'none', color: '#2D2621' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={saveHomeSections} style={{ background: '#A07855', color: 'white', padding: '0.9rem 3rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(160,120,85,0.3)' }}>
                      PUBLISH TO STOREFRONT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === 'products' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Retail Operations</p>
                  <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Product <span style={{ color: '#A07855', fontStyle: 'italic' }}>Inventory</span></h1>
                </div>
                <button onClick={() => { setShowAddProduct(!showAddProduct); setEditingProduct(null); setProductForm({ name: '', category: '', price: 0, stock: 0, status: 'In Stock', image: '' }); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#A07855', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(160,120,85,0.3)' }}>
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {/* Add/Edit Product Editor */}
              {(showAddProduct || editingProduct) && (
                <div style={{ background: 'white', borderRadius: '12px', border: '1.5px solid #A07855', padding: '2rem', marginBottom: '2rem', boxShadow: '0 8px 30px rgba(160,120,85,0.1)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2621', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>
                    {editingProduct ? 'Edit Product' : 'New Product'}
                  </h3>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ width: '180px', flexShrink: 0 }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
                      <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '8px', border: '1px solid #ede9e4', overflow: 'hidden', background: '#f8f6f3' }}>
                        <img src={productForm.image || '/image/BER04428.jpg'} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <label style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                          <span style={{ background: '#A07855', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>UPLOAD</span>
                          <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => setProductForm({ ...productForm, image: val }) )} />
                        </label>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignContent: 'start' }}>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Product Name</label>
                        <input value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Category</label>
                        <input value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} placeholder="e.g. ADAPTIVE, OUTERWEAR" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Price ($)</label>
                        <input type="number" step="0.01" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Stock Quantity</label>
                        <input type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Status</label>
                        <select value={productForm.status} onChange={e => setProductForm({ ...productForm, status: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', background: 'white' }}>
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Boutique Exclusive">Boutique Exclusive</option>
                          <option value="Coming Soon">Coming Soon</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button onClick={() => { setShowAddProduct(false); setEditingProduct(null); }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: '1px solid #ede9e4', background: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>Cancel</button>
                    <button onClick={() => {
                      if (!productForm.name || !productForm.category) { alert('Name and Category are required.'); return; }
                      if (editingProduct) {
                        saveProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p));
                      } else {
                        saveProducts([{ ...productForm, id: Date.now() }, ...products]);
                      }
                      setShowAddProduct(false);
                      setEditingProduct(null);
                    }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: 'none', background: '#A07855', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                      {editingProduct ? 'Save Changes' : 'Create Product'}
                    </button>
                  </div>
                </div>
              )}

              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fcfaf8' }}>
                      {['Image', 'Product Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', borderBottom: '1px solid #ede9e4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) : products).map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f5f2ef', background: editingProduct?.id === p.id ? '#fcf8f5' : 'transparent' }}>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ede9e4' }}>
                            <img src={p.image || '/image/BER04428.jpg'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#2D2621' }}>{p.name}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', color: '#A07855', fontWeight: 700 }}>{p.category}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#2D2621' }}>${p.price.toFixed(2)}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>{p.stock}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, background: p.status === 'In Stock' ? '#dcfce7' : p.status === 'Low Stock' ? '#fef9c3' : '#dbeafe', color: p.status === 'In Stock' ? '#16a34a' : p.status === 'Low Stock' ? '#854d0e' : '#1d4ed8' }}>{p.status}</span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => { setEditingProduct(p); setProductForm({ ...p }); setShowAddProduct(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid #A07855', background: 'transparent', color: '#A07855', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => { if (window.confirm('Delete this product?')) { saveProducts(products.filter(item => item.id !== p.id)); if (editingProduct?.id === p.id) setEditingProduct(null); } }}
                              style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'orders' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Retail Operations</p>
                <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Customer <span style={{ color: '#A07855', fontStyle: 'italic' }}>Orders</span></h1>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fcfaf8' }}>
                      {['Order ID', 'Customer', 'Product', 'Date', 'Amount', 'Status'].map(h => (
                        <th key={h} style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', borderBottom: '1px solid #ede9e4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f2ef' }}>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#A07855' }}>{o.id}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#333' }}>{o.customer}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#666' }}>{o.product}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#999' }}>{o.date}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#2D2621' }}>${o.amount.toFixed(2)}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: o.status === 'Delivered' ? '#dcfce7' : o.status === 'Shipped' ? '#dbeafe' : '#fef9c3', color: o.status === 'Delivered' ? '#16a34a' : o.status === 'Shipped' ? '#2563eb' : '#854d0e' }}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ABOUT PAGE EDITOR ── */}
          {activeTab === 'about' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Brand Narrative</p>
                <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>About Page <span style={{ color: '#A07855', fontStyle: 'italic' }}>Editor</span></h1>
              </div>

              <Section title="Hero Section">
                <Field label="Tagline" value={about.heroTagline} onChange={v => setAbout({ ...about, heroTagline: v })} />
                <Field label="Headline" value={about.heroHeadline} onChange={v => setAbout({ ...about, heroHeadline: v })} />
                <Field label="Subtext" value={about.heroSubtext} onChange={v => setAbout({ ...about, heroSubtext: v })} textarea />
              </Section>

              <Section title="Brand Story">
                <Field label="Story Heading" value={about.storyHeading} onChange={v => setAbout({ ...about, storyHeading: v })} />
                <Field label="Story Body" value={about.storyBody} onChange={v => setAbout({ ...about, storyBody: v })} textarea />
                <Field label="Craftsmanship Heading" value={about.craftsmanshipHeading} onChange={v => setAbout({ ...about, craftsmanshipHeading: v })} />
                <Field label="Craftsmanship Body" value={about.craftsmanshipBody} onChange={v => setAbout({ ...about, craftsmanshipBody: v })} textarea />
              </Section>

              <Section title="Founder — Beza Mengistu">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Founder Name" value={about.founderName} onChange={v => setAbout({ ...about, founderName: v })} />
                  <Field label="Founder Title" value={about.founderTitle} onChange={v => setAbout({ ...about, founderTitle: v })} />
                </div>
                <Field label="Founder Bio" value={about.founderBio} onChange={v => setAbout({ ...about, founderBio: v })} textarea />
                <div>
                  <label style={{ fontSize: '0.6rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Founder Photo</label>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    {/* Large Preview */}
                    <div style={{ position: 'relative', width: '160px', height: '200px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ede9e4', flexShrink: 0, background: '#f5f2ef' }}>
                      <img
                        src={founderImagePreview}
                        alt="Founder"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <label style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.35)', opacity: 0, transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                        <span style={{ background: '#A07855', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em' }}>CHANGE PHOTO</span>
                        <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => { setFounderImagePreview(val); setAbout(a => ({ ...a, founderImage: val })); })} />
                      </label>
                    </div>
                    {/* Instructions */}
                    <div style={{ paddingTop: '0.5rem' }}>
                      <p style={{ fontSize: '0.85rem', color: '#2D2621', fontWeight: 600, marginBottom: '0.4rem' }}>{about.founderName || 'Founder'}</p>
                      <p style={{ fontSize: '0.8rem', color: '#A07855', marginBottom: '1rem' }}>{about.founderTitle || 'Title'}</p>
                      <p style={{ fontSize: '0.78rem', color: '#999', lineHeight: '1.6', marginBottom: '1.25rem', maxWidth: '260px' }}>Hover over the photo and click to upload a new image. Recommended: portrait orientation, at least 400×500px.</p>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#2D2621', color: 'white', padding: '0.65rem 1.25rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                        Upload Photo
                        <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, val => { setFounderImagePreview(val); setAbout(a => ({ ...a, founderImage: val })); })} />
                      </label>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Mission & Vision">
                <Field label="Section Headline" value={about.sectionHeadline} onChange={v => setAbout({ ...about, sectionHeadline: v })} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mission (01)</p>
                    <Field label="Title" value={about.missionTitle} onChange={v => setAbout({ ...about, missionTitle: v })} />
                    <Field label="Body" value={about.missionBody} onChange={v => setAbout({ ...about, missionBody: v })} textarea />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vision (02)</p>
                    <Field label="Title" value={about.visionTitle} onChange={v => setAbout({ ...about, visionTitle: v })} />
                    <Field label="Body" value={about.visionBody} onChange={v => setAbout({ ...about, visionBody: v })} textarea />
                  </div>
                </div>
              </Section>

              <Section title="CTA Banner & Featured Collections">
                <Field label="CTA Headline" value={about.ctaHeadline} onChange={v => setAbout({ ...about, ctaHeadline: v })} />
                <Field label="CTA Button Text" value={about.ctaButton} onChange={v => setAbout({ ...about, ctaButton: v })} />
                <Field label="Featured Collections Tagline" value={about.featuredCollectionsTagline} onChange={v => setAbout({ ...about, featuredCollectionsTagline: v })} textarea />
              </Section>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
                <button onClick={() => { saveAbout(about); alert('✓ About page updated successfully.'); }} style={{ background: '#A07855', color: 'white', padding: '0.9rem 3rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(160,120,85,0.3)' }}>
                  PUBLISH ABOUT PAGE
                </button>
              </div>
            </div>
          )}

          {/* ── PORTFOLIO ── */}
          {activeTab === 'portfolio' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Storefront Narrative</p>
                  <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Design <span style={{ color: '#A07855', fontStyle: 'italic' }}>Portfolio</span></h1>
                </div>
                <button onClick={() => setShowAddProject(!showAddProject)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#A07855', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(160,120,85,0.3)' }}>
                  <Plus size={16} /> Add Project
                </button>
              </div>

              {/* Add Project Form */}
              {showAddProject && (
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', padding: '2rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2D2621', marginBottom: '1.5rem' }}>New Portfolio Project</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Project Title</label>
                      <input value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} placeholder="e.g. The Accessible Runway" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Category</label>
                      <input value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} placeholder="e.g. Lookbook, Documentary" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Description</label>
                    <textarea value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} rows={2} placeholder="Briefly describe this project..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', resize: 'none', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Project Image</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {newProjectImage && <img src={newProjectImage} alt="preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ede9e4' }} />}
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#f8f6f3', border: '1px solid #ede9e4', color: '#555', padding: '0.65rem 1.25rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                          Choose Image
                          <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, (val) => { setNewProjectImage(val); setNewProject(p => ({ ...p, image: val })); })} />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>External Link (optional)</label>
                      <input value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => { setShowAddProject(false); setNewProject({ title: '', category: '', description: '', link: '#', image: '' }); setNewProjectImage(''); }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: '1px solid #ede9e4', background: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>Cancel</button>
                    <button onClick={() => {
                      if (!newProject.title || !newProject.category) { alert('Title and Category are required.'); return; }
                      const entry = { ...newProject, id: Date.now(), image: newProjectImage || '/image/BER04428.jpg' };
                      savePortfolio([...portfolio, entry]);
                      setShowAddProject(false);
                      setNewProject({ title: '', category: '', description: '', link: '#', image: '' });
                      setNewProjectImage('');
                    }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: 'none', background: '#A07855', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>Save Project</button>
                  </div>
                </div>
              )}

              {/* Portfolio Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {portfolio.map(project => (
                  <div key={project.id}>
                    {/* Card */}
                    <div style={{ display: 'flex', background: 'white', borderRadius: '12px', border: editingProject?.id === project.id ? '1.5px solid #A07855' : '1px solid #ede9e4', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      {/* Thumbnail */}
                      <div style={{ width: '220px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.55)', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>{project.category}</div>
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#2D2621', marginBottom: '0.4rem' }}>{project.title}</h3>
                          <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: '1.6', marginBottom: '0.75rem' }}>{project.description}</p>
                          {project.link && project.link !== '#' && (
                            <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: '#A07855', textDecoration: 'none' }}>
                              View Project <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
                          <button
                            onClick={() => {
                              if (editingProject?.id === project.id) { setEditingProject(null); setEditImage(''); }
                              else { setEditingProject({ ...project }); setEditImage(project.image); setShowAddProject(false); }
                            }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #A07855', background: editingProject?.id === project.id ? '#A07855' : 'transparent', color: editingProject?.id === project.id ? 'white' : '#A07855', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <Pencil size={13} /> {editingProject?.id === project.id ? 'Cancel Edit' : 'Edit'}
                          </button>
                          <button
                            onClick={() => { if (window.confirm('Delete this project?')) { savePortfolio(portfolio.filter(p => p.id !== project.id)); if (editingProject?.id === project.id) setEditingProject(null); } }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #fee2e2', background: '#fff5f5', color: '#ef4444', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inline Edit Panel */}
                    {editingProject?.id === project.id && (
                      <div style={{ background: '#fcfaf8', border: '1px solid #e8e2da', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '1.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Editing: {project.title}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Title</label>
                            <input value={editingProject.title} onChange={e => setEditingProject({ ...editingProject, title: e.target.value })} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', background: 'white' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Category</label>
                            <input value={editingProject.category} onChange={e => setEditingProject({ ...editingProject, category: e.target.value })} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', background: 'white' }} />
                          </div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Description</label>
                          <textarea value={editingProject.description} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} rows={2} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', resize: 'none', outline: 'none', background: 'white', lineHeight: '1.6' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Cover Photo</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img src={editImage || editingProject.image} alt="preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ede9e4', flexShrink: 0 }} />
                              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'white', border: '1px solid #ede9e4', color: '#555', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                                Change Photo
                                <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, (val) => { setEditImage(val); setEditingProject(p => ({ ...p, image: val })); })} />
                              </label>
                            </div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>External Link</label>
                            <input value={editingProject.link} onChange={e => setEditingProject({ ...editingProject, link: e.target.value })} style={{ width: '100%', padding: '0.7rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', background: 'white' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => { setEditingProject(null); setEditImage(''); }} style={{ padding: '0.65rem 1.5rem', borderRadius: '6px', border: '1px solid #ede9e4', background: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#666' }}>Cancel</button>
                          <button onClick={() => {
                            if (!editingProject.title || !editingProject.category) { alert('Title and Category are required.'); return; }
                            savePortfolio(portfolio.map(p => p.id === editingProject.id ? { ...editingProject, image: editImage || editingProject.image } : p));
                            setEditingProject(null);
                            setEditImage('');
                          }} style={{ padding: '0.65rem 1.5rem', borderRadius: '6px', border: 'none', background: '#A07855', color: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, boxShadow: '0 4px 12px rgba(160,120,85,0.25)' }}>Save Changes</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {portfolio.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>
                  <Briefcase size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                  <p style={{ fontSize: '0.9rem' }}>No portfolio projects yet. Click "Add Project" to get started.</p>
                </div>
              )}
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === 'customers' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A07855', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>System Directory</p>
                  <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: 0 }}>Patron <span style={{ color: '#A07855', fontStyle: 'italic' }}>Directory</span></h1>
                </div>
                <button onClick={() => { setShowAddCustomer(!showAddCustomer); setEditingCustomer(null); setCustomerForm({ name: '', email: '', orders: 0, totalSpent: 0 }); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#A07855', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(160,120,85,0.3)' }}>
                  <Plus size={16} /> Add Patron
                </button>
              </div>

              {/* Add/Edit Customer Editor */}
              {(showAddCustomer || editingCustomer) && (
                <div style={{ background: 'white', borderRadius: '12px', border: '1.5px solid #A07855', padding: '2rem', marginBottom: '2rem', boxShadow: '0 8px 30px rgba(160,120,85,0.1)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2621', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>
                    {editingCustomer ? 'Edit Patron Info' : 'New Patron Profile'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                      <input value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} placeholder="e.g. Elena Rodriguez" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
                      <input value={customerForm.email} onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })} type="email" placeholder="email@address.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Total Orders</label>
                      <input type="number" value={customerForm.orders} onChange={e => setCustomerForm({ ...customerForm, orders: parseInt(e.target.value) || 0 })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#A07855', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Total Spent ($)</label>
                      <input type="number" step="0.01" value={customerForm.totalSpent} onChange={e => setCustomerForm({ ...customerForm, totalSpent: parseFloat(e.target.value) || 0 })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e2e2', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button onClick={() => { setShowAddCustomer(false); setEditingCustomer(null); }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: '1px solid #ede9e4', background: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>Cancel</button>
                    <button onClick={() => {
                      if (!customerForm.name || !customerForm.email) { alert('Name and Email are required.'); return; }
                      if (editingCustomer) {
                        saveCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...customerForm } : c));
                      } else {
                        saveCustomers([...customers, { ...customerForm, id: `CUST-${Date.now().toString().slice(-4)}` }]);
                      }
                      setShowAddCustomer(false);
                      setEditingCustomer(null);
                    }} style={{ padding: '0.7rem 1.5rem', borderRadius: '6px', border: 'none', background: '#A07855', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                      {editingCustomer ? 'Save Changes' : 'Create Patron'}
                    </button>
                  </div>
                </div>
              )}

              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ede9e4', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fcfaf8' }}>
                      {['Patron ID', 'Full Name', 'Email', 'Orders', 'Total Spent', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', borderBottom: '1px solid #ede9e4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery ? customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())) : customers).map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f5f2ef', background: editingCustomer?.id === c.id ? '#fcf8f5' : 'transparent' }}>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', color: '#A07855', fontWeight: 700 }}>{c.id}</td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#2D2621' }}>{c.name}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#666' }}>{c.email}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#2D2621' }}>{c.orders}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#A07855' }}>${parseFloat(c.totalSpent).toFixed(2)}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => { setEditingCustomer(c); setCustomerForm({ ...c }); setShowAddCustomer(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid #A07855', background: 'transparent', color: '#A07855', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => { if (window.confirm('Delete this patron?')) { saveCustomers(customers.filter(item => item.id !== c.id)); if (editingCustomer?.id === c.id) setEditingCustomer(null); } }}
                              style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '700px', margin: '5rem auto', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(160,120,85,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#A07855' }}>
                <Settings size={28} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', marginBottom: '0.75rem' }}>Settings Module</h2>
              <p style={{ color: '#999', fontSize: '0.9rem' }}>This module is currently under construction and will be available soon.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
