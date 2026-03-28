import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getDb, MOCK_DB } from '../data/mockDb';

export default function Home() {
  const db = getDb();
  const slides = db.homeContent?.heroSlides || [];
  const aboutSec = db.homeAboutSection || MOCK_DB.homeAboutSection;
  const collections = db.featuredCollections || MOCK_DB.featuredCollections;
  const founder = db.founderSection || MOCK_DB.founderSection;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    
    const intervalId = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 Seconds per slide for legibility

    // Scroll Reveal Observer
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-3d');
    revealElements.forEach(el => observer.observe(el));

    return () => {
        clearInterval(intervalId);
        revealElements.forEach(el => observer.unobserve(el));
    };
  }, [slides.length]);

  const activeSlide = slides[currentIdx] || {
    image: "/image/BER04428.jpg",
    title: "Elegance Without Boundaries",
    subtitle: "Couture adaptive fashion inspired by the rich heritage of Ethiopia.",
    cta: "EXPLORE COLLECTION"
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Dynamic Hero Section */}
      <section 
        style={{ 
          minHeight: '85vh', 
          display: 'flex', 
          alignItems: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url("${activeSlide.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative'
        }}
        key={currentIdx} // Force re-animation on slide change
      >
        <div className="container relative flex items-center h-full w-full">
          <div className="reveal-3d active" style={{ maxWidth: '1000px', width: '100%', zIndex: 10, textAlign: 'center', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: '1', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: '"Playfair Display", serif', color: '#fff', textShadow: '0 20px 40px rgba(0,0,0,0.6)', animation: 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
               {activeSlide.title}
            </h1>
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#fff', textShadow: '2px 4px 12px rgba(0,0,0,0.8)', maxWidth: '750px', margin: '1rem auto 3rem', opacity: 0.95, animation: 'fadeIn 1.5s forwards 0.5s' }}>
                "{activeSlide.subtitle}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', animation: 'fadeIn 1.5s forwards 0.8s', opacity: 0 }}>
                  <Link to="/products" className="btn" style={{ background: '#A07855', color: '#fff', padding: '1.25rem 3rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>{activeSlide.cta}</Link>
                  <Link to="/about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff', padding: '1.25rem 3rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Our Vision</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Progress Indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', zIndex: 20 }}>
            {slides.map((_, i) => (
                <div key={i} style={{ width: i === currentIdx ? '40px' : '10px', height: '4px', background: i === currentIdx ? '#A07855' : 'rgba(255,255,255,0.3)', borderRadius: '2px', transition: 'all 0.6s ease' }}></div>
            ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container py-24 pb-40 relative" style={{ zIndex: 1 }}>
        {/* Organic Morphing Blob Background */}
        <div className="animate-morph animate-rotate-slow" style={{ 
            position: 'absolute', 
            top: '20%', 
            left: '-10%', 
            width: '600px', 
            height: '600px', 
            background: 'rgba(168, 120, 85, 0.05)', 
            zIndex: -1,
            filter: 'blur(40px)'
        }}></div>

        <div className="reveal-3d" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', color: '#2d2621' }}>About <span style={{ color: '#A07855', fontStyle: 'italic' }}>Zeraf Ability</span></h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--primary)', margin: '0 auto', marginTop: '1.5rem', opacity: 0.6 }}></div>
        </div>

        <div className="reveal-3d" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          {/* Main 3D Floating Image */}
          <div className="animate-float-3d" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '-20px', right: '20px', bottom: '20px', border: '2px solid rgba(160, 120, 85, 0.2)', zIndex: -1, borderRadius: 'var(--radius-lg)' }}></div>
            <div className="glass-premium" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
              <img src={aboutSec.image} alt="Zeraf Ability Vision" style={{ borderRadius: 'calc(var(--radius-lg) - 4px)', width: '100%', objectFit: 'cover', height: '320px' }} />
            </div>
          </div>

          {/* About Text Content */}
          <div style={{ padding: '2rem 0' }}>
            <div style={{ position: 'relative' }}>
                <span style={{ fontSize: '5rem', position: 'absolute', top: '-2rem', left: '-1rem', opacity: 0.05, fontFamily: 'serif' }}>"</span>
                <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: '2', letterSpacing: '0.02em', color: '#4a443f' }}>
                {aboutSec.bodyText}
              </p>
            </div>
            <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: '2', marginTop: '2rem', color: '#5e5650' }}>
              {aboutSec.founderLine}
            </p>
            <div style={{ marginTop: '4rem' }}>
                <Link to="/portfolio" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '1rem 2rem', borderColor: '#A07855', color: '#A07855', fontWeight: 600 }}>
                Explore The Collection <ArrowRight size={20} />
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={{ backgroundColor: '#fbfaf9', padding: '6rem 0', overflow: 'hidden', position: 'relative' }}>
        {/* Animated Background Bubbles */}
        <div className="bubble-motion" style={{ position: 'absolute', top: '-50px', left: '-50px', width: '350px', height: '350px', background: 'rgba(160, 120, 85, 0.08)', borderRadius: '50%', filter: 'blur(70px)', zIndex: 0, animationDuration: '8s' }}></div>
        <div className="bubble-motion" style={{ position: 'absolute', top: '20%', right: '10%', width: '250px', height: '250px', background: 'rgba(160, 120, 85, 0.06)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0, animationDelay: '3s', animationDuration: '12s' }}></div>
        <div className="bubble-motion" style={{ position: 'absolute', bottom: '-100px', left: '25%', width: '400px', height: '400px', background: 'rgba(160, 120, 85, 0.04)', borderRadius: '50%', filter: 'blur(90px)', zIndex: 0, animationDelay: '1s' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', color: '#2d2621' }} className="animate-slide-up">
              Our <span style={{ color: '#A07855', fontStyle: 'italic' }}>Mission</span>
            </h2>
            <div style={{ width: '80px', height: '2px', background: '#A07855', margin: '0 auto', marginTop: '1.5rem', opacity: 0.5 }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'stretch' }}>
            {/* Empowerment Card */}
            <div className="animate-slide-up">
              <div className="glass-panel animate-float-mission" style={{ 
                padding: '2rem 1.5rem', 
                height: '100%',
                textAlign: 'center', 
                backgroundColor: '#A07855', 
                color: '#fff',
                border: 'none', 
                boxShadow: '0 30px 60px rgba(140, 106, 75, 0.15)',
                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-20px) scale(1.03)'; 
                  e.currentTarget.style.boxShadow = '0 50px 100px rgba(140, 106, 75, 0.25)'; 
                  e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseOut={(e) => { 
                  e.currentTarget.style.transform = ''; 
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(140, 106, 75, 0.15)'; 
                  e.currentTarget.style.animationPlayState = 'running';
              }}>
                <div className="glimmer-shine animate-glimmer-infinite"></div>
                <div className="mission-icon" style={{ marginBottom: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                  <div className="animate-pulse-slow" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', backdropFilter: 'blur(5px)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: '"Playfair Display", serif' }}>Empowerment</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: 300, fontFamily: '"Jost", sans-serif' }}>
                  Empowering persons with disabilities by providing absolute stylistic independence through intentional, adaptive garments.
                </p>
              </div>
            </div>

            {/* Artisanal Excellence Card */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="glass-panel animate-float-mission" style={{ 
                padding: '2rem 1.5rem', 
                height: '100%',
                textAlign: 'center', 
                backgroundColor: '#A07855', 
                color: '#fff',
                border: 'none', 
                boxShadow: '0 30px 60px rgba(140, 106, 75, 0.15)',
                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-20px) scale(1.03)'; 
                  e.currentTarget.style.boxShadow = '0 50px 100px rgba(140, 106, 75, 0.25)'; 
                  e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseOut={(e) => { 
                  e.currentTarget.style.transform = ''; 
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(140, 106, 75, 0.15)'; 
                  e.currentTarget.style.animationPlayState = 'running';
              }}>
                <div className="glimmer-shine animate-glimmer-infinite" style={{ animationDelay: '1s' }}></div>
                <div className="mission-icon" style={{ marginBottom: '2rem', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                  <div className="animate-pulse-slow" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', backdropFilter: 'blur(5px)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-award"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>Artisanal Excellence</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: 300, fontFamily: '"Jost", sans-serif' }}>
                  Preserving traditional Ethiopian craftsmanship while challenging global stereotypes of what ability looks like in fashion.
                </p>
              </div>
            </div>

            {/* Inclusivity Card */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="glass-panel animate-float-mission" style={{ 
                padding: '2.5rem 1.5rem', 
                height: '100%',
                textAlign: 'center', 
                backgroundColor: '#A07855', 
                color: '#fff',
                border: 'none', 
                boxShadow: '0 30px 60px rgba(140, 106, 75, 0.15)',
                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-20px) scale(1.03)'; 
                  e.currentTarget.style.boxShadow = '0 50px 100px rgba(140, 106, 75, 0.25)'; 
                  e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseOut={(e) => { 
                  e.currentTarget.style.transform = ''; 
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(140, 106, 75, 0.15)'; 
                  e.currentTarget.style.animationPlayState = 'running';
              }}>
                <div className="glimmer-shine animate-glimmer-infinite" style={{ animationDelay: '2s' }}></div>
                <div className="mission-icon" style={{ marginBottom: '2rem', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                  <div className="animate-pulse-slow" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', backdropFilter: 'blur(5px)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 22v-9"/><path d="M12 13H5"/><path d="M12 13h7"/></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>Inclusivity</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: 300, fontFamily: '"Jost", sans-serif' }}>
                  Removing the boundaries of style to foster a world where identity and dignity are woven into every single thread.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="container py-32 pb-48 relative">
        <div className="bg-blob animate-morph" style={{ top: '50%', right: '-10%', width: '500px', height: '500px', opacity: 0.4 }}></div>
        
        <div className="reveal-3d" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', color: '#2d2621' }}>Featured <span style={{ color: '#A07855', fontStyle: 'italic' }}>Collections</span></h2>
          <div style={{ width: '60px', height: '2px', background: '#A07855', margin: '0 auto', marginTop: '1.5rem', opacity: 0.5 }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {collections.map((col, idx) => (
            <Link
              key={col.id}
              to="/collections"
              className="reveal-3d glass-premium"
              style={{ animationDelay: `${idx * 0.2}s`, textDecoration: 'none', color: 'inherit', overflow: 'hidden', padding: '0.75rem', display: 'block', transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'perspective(1000px) rotateY(10deg) translateY(-15px) scale(1.02)'; e.currentTarget.style.boxShadow = '20px 40px 80px rgba(0,0,0,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ height: '180px', width: '100%', overflow: 'hidden', borderRadius: 'calc(var(--radius-lg) - 10px)' }}>
                <img src={col.image} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) rotate(1deg)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '2rem 1.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#A07855', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{col.tag}</span>
                <h3 style={{ fontSize: '1.6rem', marginTop: '0.75rem', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>{col.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#A07855' }}>Explore Story <ArrowRight size={18} /></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="reveal-3d" style={{ textAlign: 'center', marginTop: '6rem' }}>
          <Link to="/collections" className="btn" style={{ background: '#A07855', color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, boxShadow: '0 10px 20px rgba(160, 120, 85, 0.2)' }}>
            Full Collection List
          </Link>
        </div>
      </section>

      {/* Founder Section */}
      <section className="container py-32 relative overflow-hidden">
        {/* Background Blobs for specific section */}
        <div className="bg-blob animate-rotate-slow" style={{ top: '0', left: '50%', background: 'radial-gradient(circle, rgba(140, 106, 75, 0.05) 0%, transparent 70%)' }}></div>

        <div className="reveal-3d" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', color: '#2d2621' }}>Founder <span style={{ color: '#A07855', fontStyle: 'italic' }}>Beza Mengistu</span></h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--primary)', margin: '0 auto', marginTop: '1.5rem', opacity: 0.5 }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
          {/* First Block: Image Left, Text Right */}
          <div className="reveal-3d" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="animate-float-3d" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', right: '-20px', bottom: '-20px', background: 'rgba(160, 120, 85, 0.1)', zIndex: -1, borderRadius: 'var(--radius-lg)' }}></div>
              <div className="glass-premium" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                <img src={founder.image1} alt={founder.image1Alt} style={{ borderRadius: 'calc(var(--radius-lg) - 4px)', width: '100%', objectFit: 'cover', height: '320px' }} />
              </div>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: '2', color: '#4a443f' }}>{founder.bio1}</p>
            </div>
          </div>

          {/* Second Block: Text Left, Image Right */}
          <div className="reveal-3d" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ order: 2 }}>
              <div className="animate-float-3d" style={{ position: 'relative', animationDelay: '1.5s' }}>
                <div style={{ position: 'absolute', top: '20px', left: '-20px', right: '20px', bottom: '-20px', background: 'rgba(160, 120, 85, 0.1)', zIndex: -1, borderRadius: 'var(--radius-lg)' }}></div>
                <div className="glass-premium" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <img src={founder.image2} alt={founder.image2Alt} style={{ borderRadius: 'calc(var(--radius-lg) - 4px)', width: '100%', objectFit: 'cover', height: '320px' }} />
                </div>
              </div>
            </div>
            <div style={{ order: 1 }}>
              <p className="text-muted" style={{ fontSize: '1.25rem', lineHeight: '2', color: '#4a443f', marginBottom: '3rem' }}>{founder.bio2}</p>
              <Link to="/about" className="btn" style={{ background: '#A07855', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, boxShadow: '0 10px 20px rgba(160, 120, 85, 0.2)' }}>
                Read The Full Journey <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
