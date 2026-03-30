import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { getDb } from '../data/mockDb';

export default function Footer() {
  const db = getDb();
  const social = db.socialLinks || {};

  return (
    <footer className="glass-panel mt-12" style={{ borderRadius: '0', borderBottom: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container py-12">
        <div className="grid-cols-4">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#A07855', marginBottom: '1rem' }}>Zeraf Ability</h3>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
              Inclusive adaptive fashion celebrating Ethiopian heritage and the strength of persons with disabilities.
            </p>
            <div className="flex items-center gap-4">
              <a href={social.facebook || '#'} target={social.facebook ? '_blank' : undefined} rel="noopener noreferrer" className="btn-icon" style={{ background: '#A07855', color: '#fff' }}><Facebook size={18} /></a>
              <a href={social.twitter || '#'} target={social.twitter ? '_blank' : undefined} rel="noopener noreferrer" className="btn-icon" style={{ background: '#A07855', color: '#fff' }}><Twitter size={18} /></a>
              <a href={social.instagram || '#'} target={social.instagram ? '_blank' : undefined} rel="noopener noreferrer" className="btn-icon" style={{ background: '#A07855', color: '#fff' }}><Instagram size={18} /></a>
              <a href={social.youtube || '#'} target={social.youtube ? '_blank' : undefined} rel="noopener noreferrer" className="btn-icon" style={{ background: '#A07855', color: '#fff' }}><Youtube size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Customer Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" className="form-control" />
              <button className="btn mt-2" style={{ background: '#A07855', color: '#fff', width: '100%', border: 'none', padding: '0.6rem', borderRadius: '4px' }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 py-4" style={{ borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Zeraf Ability. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
