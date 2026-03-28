import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLLECTIONS_DATA = [
  {
    id: 1,
    title: 'The Independence Line',
    description: 'A minimalist, sensory-friendly collection emphasizing magnetic closures and seamless silhouettes.',
    image: '/image/BER04428.jpg',
  },
  {
    id: 2,
    title: 'Heritage Fusion',
    description: 'Fusing traditional Ethiopian craftsmanship patterns into accessible, high-comfort outerwear.',
    image: '/image/BER04434.jpg',
  },
  {
    id: 3,
    title: 'Runway Access',
    description: 'Our award-winning elegant collection built distinctly around seated-cuts and ergonomic dynamics.',
    image: '/image/photo_2026-03-19_04-52-22.jpg',
  }
];

export default function Collections() {
  return (
    <div className="animate-fade-in" style={{ padding: '6rem 0' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-main)', letterSpacing: '0.05em' }}>
          Our <span style={{ color: 'var(--primary)' }}>Collections</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
          Discover our dedicated, curated lines designed exclusively to empower and provide absolute stylistic independence.
        </p>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {COLLECTIONS_DATA.map(col => (
            <div key={col.id} className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '350px', width: '100%' }}>
                <img src={col.image} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-main)' }}>{col.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
                  {col.description}
                </p>
                <Link to="/products" className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  Explore Pieces <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
