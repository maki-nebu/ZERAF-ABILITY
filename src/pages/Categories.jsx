import { Link } from 'react-router-dom';
import { Shirt, ShoppingBag, Footprints, Wind, Pocket, Star, Cloud, Sun } from 'lucide-react';

const CATEGORIES = [
  { id: 1, name: "Easy-On Tops", icon: <Shirt size={48} />, count: 124, color: "#A07855" },
  { id: 2, name: "Adaptive Outerwear", icon: <Wind size={48} />, count: 56, color: "#8C6A4B" },
  { id: 3, name: "Easy-Entry Footwear", icon: <Footprints size={48} />, count: 89, color: "#B29B8A" },
  { id: 4, name: "Sensory Friendly", icon: <Cloud size={48} />, count: 210, color: "#D4C1B1" },
  { id: 5, name: "Seated Comfort", icon: <ShoppingBag size={48} />, count: 34, color: "#8C6A4B" },
  { id: 6, name: "Inclusive Accessories", icon: <Pocket size={48} />, count: 77, color: "#D4C1B1" },
  { id: 7, name: "Seasonal Adaptive", icon: <Sun size={48} />, count: 102, color: "#B29B8A" },
  { id: 8, name: "Best Sellers", icon: <Star size={48} />, count: 45, color: "#A07855" }
];

export default function Categories() {
  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: '"Dancing Script", cursive', fontSize: '3.5rem', color: '#A07855', marginBottom: '1rem' }}>Browse <span style={{ color: 'var(--text-main)' }}>Categories</span></h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Explore our wide range of products categorized for your convenience. Find exactly what you are looking for.
        </p>
      </div>

      <div className="grid-cols-4">
        {CATEGORIES.map(category => (
          <Link to={`/products?category=${category.name.toLowerCase()}`} key={category.id} className="glass-panel text-center" style={{ padding: '3rem 2rem', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="mb-6" style={{ color: category.color, position: 'relative' }}>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', background: category.color, opacity: 0.1, borderRadius: '50%', filter: 'blur(10px)', zIndex: -1 }}></div>
               {category.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{category.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{category.count} Products</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
