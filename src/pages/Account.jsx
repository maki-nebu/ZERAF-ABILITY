import { useState, useMemo } from 'react';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const orders = useMemo(() => [
    {
      id: '1001',
      date: 'Oct 12, 2024',
      price: 95.00,
      status: 'Delivered',
      product: 'Easy-On Magnetic Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: '1002',
      date: 'Oct 05, 2024',
      price: 79.50,
      status: 'Delivered',
      product: 'Seated-Cut Comfort Chinos',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=100'
    }
  ], []);
  
  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="heading-section mb-8">My <span className="gradient-text">Account</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '4rem' }}>
        {/* Sidebar Nav */}
        <aside className="glass-panel p-6" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
          <div className="flex items-center gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid var(--surface-border)' }}>
            <div className="btn-icon" style={{ background: 'var(--primary)', color: 'white', width: '50px', height: '50px', border: 'none' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>JD</span>
            </div>
            <div>
              <h3 style={{ fontWeight: 600 }}>John Doe</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member since 2024</p>
            </div>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'profile' ? 'bg-primary' : 'hover:bg-surface'}`}
              onClick={() => setActiveTab('profile')}
              style={{ background: activeTab === 'profile' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-main)', textAlign: 'left', fontWeight: activeTab === 'profile' ? 600 : 400 }}
            >
              <User size={18} /> Personal Info
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'orders' ? 'bg-primary' : 'hover:bg-surface'}`}
              onClick={() => setActiveTab('orders')}
              style={{ background: activeTab === 'orders' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-main)', textAlign: 'left', fontWeight: activeTab === 'orders' ? 600 : 400 }}
            >
              <Package size={18} /> Orders
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'addresses' ? 'bg-primary' : 'hover:bg-surface'}`}
              onClick={() => setActiveTab('addresses')}
              style={{ background: activeTab === 'addresses' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', color: activeTab === 'addresses' ? 'var(--primary)' : 'var(--text-main)', textAlign: 'left', fontWeight: activeTab === 'addresses' ? 600 : 400 }}
            >
              <MapPin size={18} /> Addresses
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'settings' ? 'bg-primary' : 'hover:bg-surface'}`}
              onClick={() => setActiveTab('settings')}
              style={{ background: activeTab === 'settings' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-main)', textAlign: 'left', fontWeight: activeTab === 'settings' ? 600 : 400 }}
            >
              <Settings size={18} /> Settings
            </button>
            
            <div style={{ height: '1px', background: 'var(--surface-border)', margin: '1rem 0' }}></div>
            
            <button className="flex items-center gap-3 p-3 text-left hover:bg-surface rounded-md transition-all" style={{ color: 'var(--danger)' }}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="glass-panel p-8">
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Personal Information</h2>
              <div className="grid-cols-2 mb-6 gap-6">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" defaultValue="John" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" defaultValue="Doe" />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" defaultValue="john.doe@example.com" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Order History</h2>
              
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="glass-panel p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <div>
                        <p style={{ fontWeight: 600 }}>Order #ORD-{order.id}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--secondary)' }}>€{order.price.toFixed(2)}</p>
                        <span className="badge" style={{ background: 'var(--green)', color: 'white' }}>{order.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <img src={order.image} alt={order.product} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      <div>
                        <h4 style={{ fontWeight: 600 }}>{order.product}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Qty: 1</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="animate-fade-in">
               <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Saved Addresses</h2>
               <div className="glass-panel p-6 mb-4" style={{ border: '1px solid var(--primary)', background: 'rgba(124, 58, 237, 0.05)' }}>
                 <div className="flex justify-between items-start mb-2">
                   <h4 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} color="var(--primary)" /> Home (Default)</h4>
                   <div className="flex gap-2">
                     <button className="btn-icon" style={{ width: '32px', height: '32px' }}><Settings size={14}/></button>
                   </div>
                 </div>
                 <p style={{ color: 'var(--text-muted)' }}>John Doe<br/>123 Tech Avenue, Apt 4B<br/>San Francisco, CA 94103<br/>United States</p>
               </div>
               <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>+ Add New Address</button>
            </div>
          )}

           {activeTab === 'settings' && (
            <div className="animate-fade-in">
               <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Account Settings</h2>
               <div className="mb-8">
                 <h3 className="mb-4" style={{ fontWeight: 600 }}>Notifications</h3>
                 <label className="flex items-center gap-3 mb-3 cursor-pointer">
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                    <span>Order updates and shipping info</span>
                 </label>
                 <label className="flex items-center gap-3 mb-3 cursor-pointer">
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                    <span>Promotions and sales</span>
                 </label>
               </div>
               
               <div>
                 <h3 className="mb-4" style={{ fontWeight: 600 }}>Security</h3>
                 <button className="btn btn-outline mb-4">Change Password</button>
                 <br />
                 <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Delete Account</button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
