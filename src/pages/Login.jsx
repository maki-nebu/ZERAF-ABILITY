import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    // Simulate authentication
    localStorage.setItem('zeraf_auth', 'true');
    navigate('/products');
  };

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
      <style>{`
        @keyframes subtleFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .auth-input {
          background: transparent !important;
          border: none !important;
          border-bottom: 2px solid rgba(160,120,85,0.2) !important;
          border-radius: 0 !important;
          padding: 1rem 0 0.5rem 0 !important;
          font-size: 1.1rem;
          color: #2D2621 !important;
          transition: all 0.3s ease;
          width: 100%;
        }
        .auth-input:focus {
          outline: none !important;
          border-bottom: 2px solid #A07855 !important;
        }
        .auth-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #A07855;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.2rem;
          display: block;
        }
        .form-panel {
          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .auth-btn {
          background: linear-gradient(135deg, #2D2621 0%, #1a1613 100%);
          color: #fff;
          padding: 1.5rem;
          border-radius: 4px;
          border: none;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
          font-size: 1rem;
          box-shadow: 0 15px 30px rgba(45,38,33,0.3);
        }
        .auth-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(45,38,33,0.4);
          background: linear-gradient(135deg, #A07855 0%, #8A6546 100%);
        }
        .image-panel {
          position: relative;
          overflow: hidden;
        }
        .image-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(45deg, rgba(45,38,33,0.8) 0%, rgba(160,120,85,0.2) 100%);
        }
      `}</style>

      {/* Left Side: Editorial Image */}
      <div className="image-panel hidden md:flex" style={{ flex: '1.2', minHeight: '100vh', background: '#000' }}>
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Fashion" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'subtleFloat 20s ease-in-out infinite' }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, textAlign: 'center', width: '80%' }}>
          <Lock size={64} color="#fff" style={{ opacity: 0.8, margin: '0 auto 2rem' }} strokeWidth={1} />
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: '"Playfair Display", serif', color: '#fff', lineHeight: '1.1', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Exclusive <br/><span style={{ fontStyle: 'italic', color: '#D4C1B1' }}>Access</span>
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#A07855', margin: '2rem auto' }}></div>
          <p style={{ color: '#fff', fontSize: '1.1rem', letterSpacing: '0.1em', opacity: 0.9 }}>
            Join Zeraf Ability to unlock our world of handcrafted adaptive fashion.
          </p>
        </div>
      </div>

      {/* Right Side: Sign Up / Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center relative" style={{ background: '#fbfaf9', padding: '4rem 2rem' }}>
        <div className="form-panel w-full" style={{ maxWidth: '440px' }}>
          
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#A07855', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block', background: '#f5f2ef', padding: '0.4rem 1rem', borderRadius: '20px' }}>
              {isLogin ? 'Welcome Back' : 'Become a Member'}
            </span>
            <h1 style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', color: '#2D2621', margin: '1rem 0', lineHeight: 1.2 }}>
              {isLogin ? 'Sign In' : <>Sign Up to <span style={{ fontStyle: 'italic', color: '#A07855' }}>Shop</span></>}
            </h1>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {isLogin 
                ? 'Enter your credentials to access your exclusive Zeraf account.' 
                : 'Create an account to gain full access to our boutique and begin filling your cart.'}
            </p>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {!isLogin && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label className="auth-label">First Name</label>
                  <input type="text" className="auth-input" placeholder="Sarah" required />
                </div>
                <div>
                  <label className="auth-label">Last Name</label>
                  <input type="text" className="auth-input" placeholder="Jenkins" required />
                </div>
              </div>
            )}

            <div>
              <label className="auth-label">Email Address</label>
              <input type="email" className="auth-input" placeholder="sarah.j@example.com" required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div className="flex justify-between items-end mb-1">
                <label className="auth-label">Password</label>
                {isLogin && <a href="#" style={{ fontSize: '0.75rem', color: '#A07855', fontWeight: 600, letterSpacing: '0.05em' }}>Forgot Password?</a>}
              </div>
              <input type="password" className="auth-input" placeholder="••••••••" required />
            </div>

            <button type="submit" className="auth-btn">
              {isLogin ? 'ENTER BOUTIQUE' : 'CREATE ACCOUNT & SHOP'} <ArrowRight size={20} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', color: '#777' }}>
            {isLogin ? "Don't have an account yet? " : "Already an exclusive member? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: '#A07855', fontWeight: 700, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '0.05em' }}
            >
              {isLogin ? 'SIGN UP HERE' : 'SIGN IN HERE'}
            </button>
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '4rem', opacity: 0.5, fontSize: '0.7rem', color: '#2D2621', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <ShieldCheck size={14} /> Encrypted & Secure
          </div>

        </div>
      </div>
    </div>
  );
}
