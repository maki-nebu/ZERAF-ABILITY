import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getDb } from '../data/mockDb';

export default function Header() {
  const { cartCount } = useCart();
  
  return (
    <header>
      {/* Main Navigation */}
      <div style={{ background: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', position: 'relative', zIndex: 100 }} className="py-4">
        <div className="container flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={getDb().siteLogo} 
              alt="Zeraf Ability" 
              style={{ height: '60px', objectFit: 'contain' }} 
            />
            <span style={{ display: 'inline-block', marginLeft: '0.75rem', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.05em', color: '#333', textTransform: 'uppercase' }}>ZERAF ABILITY</span>
          </Link>

          {/* Nav List */}
          <nav style={{ display: 'flex', gap: '40px', marginLeft: 'auto', marginRight: '3rem' }}>
            <Link to="/" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 'bold', color: '#A07855', fontSize: '1.6rem', letterSpacing: '0.05em' }}>Home</Link>
            <Link to="/about" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 'bold', color: '#A07855', fontSize: '1.6rem', letterSpacing: '0.05em' }}>About</Link>
            <Link to="/products" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 'bold', color: '#A07855', fontSize: '1.6rem', letterSpacing: '0.05em' }}>Shop</Link>
            <Link to="/collections" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 'bold', color: '#A07855', fontSize: '1.6rem', letterSpacing: '0.05em' }}>Collections</Link>
            <Link to="/contact" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 'bold', color: '#A07855', fontSize: '1.6rem', letterSpacing: '0.05em' }}>Contact Us</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/cart" style={{ color: '#333', position: 'relative' }}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '-10px', 
                  background: '#A07855', 
                  color: 'white', 
                  fontSize: '0.7rem', 
                  fontWeight: 800, 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
