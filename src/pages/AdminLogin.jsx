import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Mail, Key, Info } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@zeraf.com');
  const [password, setPassword] = useState('strongAdmin123!');
  const [error, setError] = useState(null);
  const [csrfToken] = useState(() => {
    const token = Math.random().toString(36).substr(2, 12);
    localStorage.setItem('zeraf_csrf_token', token);
    return token;
  });

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSecureLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // SQL Injection Protection (Input Sanitization simulation)
    const sanitizeInput = (input) => input.replace(/['";]/g, ''); 
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    const success = await login(cleanEmail, cleanPassword, csrfToken);

    if (success) {
      // Redirect to the "Hidden" Admin URL
      navigate('/zeraf-secure-portal/dashboard');
    } else {
      setError('Invalid Credentials or Security Violation (CSRF Token Mismatch)');
    }
  };

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Security Background Dynamics */}
      <div className="bg-blob-warm animate-rotate-slow" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '800px', height: '800px', filter: 'blur(120px)', opacity: 0.3, zIndex: 0 }}></div>
      <div className="bg-blob-warm animate-morph" style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '600px', filter: 'blur(100px)', opacity: 0.2, zIndex: 0 }}></div>

      <div className="reveal-3d active" style={{ width: '100%', maxWidth: '420px', zIndex: 1, padding: '1.5rem' }}>
        <div className="glass-premium" style={{ padding: '3.5rem 2.5rem', border: 'none', background: 'rgba(255,255,255,0.7)', position: 'relative', overflow: 'hidden' }}>
           {/* Security Header */}
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ width: '60px', height: '60px', background: 'white', border: '1px solid rgba(160, 120, 85, 0.2)', color: '#A07855', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(160, 120, 85, 0.1)' }}>
                 <ShieldCheck size={28} />
              </div>
              <h1 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', marginBottom: '0.5rem' }}>Secure Portal</h1>
              <p style={{ fontSize: '0.85rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.2rem', textTransform: 'uppercase' }}>Zeraf Ability Management</p>
           </div>

           {error && (
              <div style={{ background: 'rgba(220, 38, 38, 0.05)', color: '#dc2626', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '2rem', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
                 <Info size={16} /> <span>{error}</span>
              </div>
           )}

           {/* Security Form */}
           <form onSubmit={handleSecureLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                 <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', textTransform: 'uppercase', color: '#A07855', marginBottom: '0.75rem', display: 'block' }}>Administrator Email</label>
                 <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                    <input 
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 3rem', background: '#fcfaf8', border: '1px solid rgba(160, 120, 85, 0.15)', borderRadius: '4px', fontSize: '0.95rem' }} 
                       required 
                    />
                 </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                 <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', textTransform: 'uppercase', color: '#A07855', marginBottom: '0.75rem', display: 'block' }}>Cipher Access Key</label>
                 <div style={{ position: 'relative' }}>
                    <Key size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                    <input 
                       type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 3rem', background: '#fcfaf8', border: '1px solid rgba(160, 120, 85, 0.15)', borderRadius: '4px', fontSize: '0.95rem' }} 
                       required 
                    />
                 </div>
              </div>

              <button type="submit" className="btn" style={{ background: '#A07855', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '4px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontWeight: 700, letterSpacing: '0.15rem', boxShadow: '0 20px 40px rgba(160, 120, 85, 0.2)', cursor: 'pointer' }}>
                 AUTHORIZE ACCESS <Lock size={18} />
              </button>
           </form>

           <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#A07855', opacity: 0.5, letterSpacing: '0.05rem' }}>
              &copy; {new Date().getFullYear()} Zeraf Secure System. All rights reserved.
           </div>
        </div>
      </div>
    </div>
  );
}
