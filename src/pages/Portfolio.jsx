import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "The Accessible Runway",
    category: "Fashion Show",
    image: "/image/BER04428.jpg",
    description: "Our debut showcase featuring adaptive designs that broke barriers in mainstream fashion weeks.",
    link: "#"
  },
  {
    id: 2,
    title: "Everyday Independence",
    category: "Lookbook",
    image: "/image/BER04434.jpg",
    description: "A photographic series exploring how magnetic closures and seated cuts empower daily routines.",
    link: "#"
  },
  {
    id: 3,
    title: "Artisans of Addis",
    category: "Documentary",
    image: "/image/photo_2026-03-19_02-34-23.jpg",
    description: "A behind-the-scenes look at the women who handcraft our inclusive collections.",
    link: "#"
  },
  {
    id: 4,
    title: "Sensory Comfort Series",
    category: "Design Case Study",
    image: "/image/photo_2026-03-19_02-47-13.jpg",
    description: "How we developed tagless, flat-seam garments for neurodivergent individuals.",
    link: "#"
  }
];

export default function Portfolio() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="heading-hero mb-6">Our <span className="gradient-text">Portfolio</span></h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          Explore our creative ventures, runway shows, and design case studies that define the inclusive vision behind Zeraf Ability.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="container pb-20">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
          {PORTFOLIO_PROJECTS.map((project) => (
            <div key={project.id} className="glass-panel group overflow-hidden" style={{ borderRadius: 'var(--radius-md)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)'} }}>
              <div style={{ overflow: 'hidden', height: '250px', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.description}</p>
                <Link to={project.link} className="flex items-center gap-2" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  View Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Banner */}
      <section className="glass-panel py-16 text-center" style={{ borderRadius: '0', borderLeft: 'none', borderRight: 'none', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="heading-section mb-6">Interested in our design process?</h2>
          <p className="mb-8 text-muted" style={{ fontSize: '1.1rem' }}>We are always open to collaborations and showcasing our adaptive methodologies.</p>
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get in Touch</button>
        </div>
      </section>
    </div>
  );
}
