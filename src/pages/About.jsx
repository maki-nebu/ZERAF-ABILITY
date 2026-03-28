import { useEffect } from 'react';
import { Heart, Globe, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDb, MOCK_DB } from '../data/mockDb';

export default function About() {
  const db = getDb();
  const a = db.aboutContent || MOCK_DB.aboutContent;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.reveal-3d');
    els.forEach(el => observer.observe(el));
    return () => els.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Blobs */}
      <div className="bg-blob-warm animate-rotate-slow" style={{ position: 'fixed', top: '-10%', right: '-5%', width: '800px', height: '800px', filter: 'blur(120px)', zIndex: 0 }}></div>
      <div className="bg-blob-warm animate-morph" style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '600px', height: '600px', filter: 'blur(100px)', zIndex: 0, opacity: 0.5, animationDirection: 'reverse' }}></div>

      {/* Hero */}
      <section className="container relative py-20 flex flex-col items-center justify-center text-center" style={{ zIndex: 1, minHeight: '40vh' }}>
        <div className="reveal-3d active">
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#A07855', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{a.heroTagline}</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: '"Playfair Display", serif', lineHeight: '1', color: '#2D2621' }}>
            {a.heroHeadline.split(' ').slice(0, -1).join(' ')} <span style={{ color: '#A07855', fontStyle: 'italic' }}>{a.heroHeadline.split(' ').slice(-1)}</span>
          </h1>
          <div style={{ width: '30px', height: '1px', background: '#A07855', margin: '2rem auto' }}></div>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', color: '#5e5650', fontFamily: '"Jost", sans-serif' }}>
            {a.heroSubtext}
          </p>
        </div>
      </section>

      {/* Founder + Story */}
      <section className="container py-32 relative" style={{ zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Founder Image */}
          <div className="reveal-3d" style={{ position: 'sticky', top: '100px' }}>
            <div className="perspective-container">
              <div className="animate-float-3d" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '30px', left: '30px', right: '-30px', bottom: '-30px', border: '1px solid rgba(160, 120, 85, 0.3)', borderRadius: '12px' }}></div>
                <div className="glass-premium" style={{ border: 'none', padding: '0.5rem', boxShadow: '20px 40px 80px rgba(160, 120, 85, 0.1)' }}>
                  <img src={a.founderImage} alt={a.founderName} style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              </div>
            </div>
            {/* Founder Info underneath image */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: '#2D2621', fontFamily: '"Playfair Display", serif' }}>{a.founderName}</p>
              <p style={{ fontSize: '0.8rem', color: '#A07855', fontWeight: 600, letterSpacing: '0.05em', marginTop: '0.25rem' }}>{a.founderTitle}</p>
              <p style={{ fontSize: '0.9rem', color: '#5e5650', lineHeight: '1.7', marginTop: '1rem', maxWidth: '360px', margin: '1rem auto 0' }}>{a.founderBio}</p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="flex flex-col gap-16">
            <div className="reveal-3d">
              <h2 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', marginBottom: '2rem', color: '#2D2621' }}>
                {a.storyHeading.split(' ').slice(0, -1).join(' ')} <span style={{ color: '#A07855' }}>{a.storyHeading.split(' ').slice(-1)}</span>
              </h2>
              <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: '2.2' }}>{a.storyBody}</p>
            </div>

            <div className="reveal-3d">
              <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A07855', marginBottom: '2rem' }}>{a.craftsmanshipHeading}</h3>
              <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: '2.2' }}>{a.craftsmanshipBody}</p>
            </div>

            <div className="reveal-3d" style={{ display: 'flex', gap: '3rem' }}>
              {[
                { icon: <Heart size={24} />, label: 'Passion' },
                { icon: <Globe size={24} />, label: 'Heritage' },
                { icon: <Users size={24} />, label: 'Impact' }
              ].map((item, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div className="animate-pulse-slow" style={{ width: '60px', height: '60px', background: 'rgba(160, 120, 85, 0.1)', color: '#A07855', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2D2621', opacity: 0.6 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-40" style={{ backgroundColor: 'rgba(160, 120, 85, 0.02)', position: 'relative', zIndex: 1 }}>
        <div className="container overflow-hidden">
          <div className="reveal-3d" style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: '"Playfair Display", serif', color: '#2D2621' }}>
              {a.sectionHeadline.split(' ').slice(0, -1).join(' ')} <span style={{ color: '#A07855', fontStyle: 'italic' }}>{a.sectionHeadline.split(' ').slice(-1)}</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div className="reveal-3d glass-premium" style={{ padding: '4rem', background: 'rgba(255, 255, 255, 0.5)' }}>
              <div style={{ fontSize: '3rem', color: '#A07855', marginBottom: '2rem', fontFamily: 'serif' }}>01</div>
              <h4 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif', color: '#A07855' }}>{a.missionTitle}</h4>
              <p className="text-muted" style={{ lineHeight: '2' }}>{a.missionBody}</p>
            </div>
            <div className="reveal-3d glass-premium" style={{ padding: '4rem', background: 'rgba(255, 255, 255, 0.5)', transform: 'translateY(40px)' }}>
              <div style={{ fontSize: '3rem', color: '#A07855', marginBottom: '2rem', fontFamily: 'serif' }}>02</div>
              <h4 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif', color: '#A07855' }}>{a.visionTitle}</h4>
              <p className="text-muted" style={{ lineHeight: '2' }}>{a.visionBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-40">
        <div className="reveal-3d glass-premium" style={{ padding: '8rem 4rem', textAlign: 'center', border: 'none', background: '#A07855', overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(160, 120, 85, 0.3)' }}>
          <div className="glimmer-shine animate-glimmer-infinite"></div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: '"Playfair Display", serif', marginBottom: '3rem', color: '#fff' }}>{a.ctaHeadline}</h2>
          <Link to="/collections" className="btn" style={{ background: '#fff', color: '#A07855', border: 'none', padding: '1.2rem 3rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '15px', fontWeight: 700, letterSpacing: '0.1em' }}>
            {a.ctaButton} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
