import { useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
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
        revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="page-theme-sand" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Dynamics */}
      <div className="bg-blob-warm animate-rotate-slow" style={{ position: 'fixed', top: '10%', right: '-5%', width: '600px', height: '600px', zIndex: 0 }}></div>
      <div className="bg-blob-warm animate-morph" style={{ position: 'fixed', bottom: '10%', left: '-5%', width: '500px', height: '500px', zIndex: 0, opacity: 0.5 }}></div>

      <div className="container relative py-20" style={{ zIndex: 1, maxWidth: '1080px' }}>
        {/* Editorial Header */}
        <div className="reveal-3d active" style={{ marginBottom: '6rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#A07855', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>Personalized Concierge</span>
          <h1 style={{ fontSize: '1.85rem', fontFamily: '"Playfair Display", serif', color: '#2D2621' }}>
            Contact <span style={{ color: '#A07855', fontStyle: 'italic' }}>Zeraf Ability</span>
          </h1>
          <div style={{ width: '30px', height: '1px', background: '#A07855', margin: '2rem auto' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Contact Details Cards */}
          <div className="flex flex-col gap-6">
            <div className="reveal-3d glass-premium" style={{ padding: '2.5rem 1.5rem', textAlign: 'left', border: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(160, 120, 85, 0.1)', color: '#A07855', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Mail size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#2D2621', fontFamily: '"Playfair Display", serif' }}>Boutique Inquiries</h3>
              <p style={{ color: '#5e5650', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Direct correspondence for orders and custom adaptive tailoring.
              </p>
              <div style={{ marginTop: '1rem', color: '#A07855', fontWeight: 700, fontSize: '0.85rem' }}>concierge@zeraf.boutique</div>
            </div>

            <div className="reveal-3d glass-premium" style={{ padding: '2.5rem 1.5rem', textAlign: 'left', border: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(160, 120, 85, 0.1)', color: '#A07855', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Phone size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#2D2621', fontFamily: '"Playfair Display", serif' }}>Voice Assistance</h3>
              <p style={{ color: '#5e5650', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Available Monday – Friday for inclusive assistance.
              </p>
              <div style={{ marginTop: '1rem', color: '#A07855', fontWeight: 700, fontSize: '0.85rem' }}>+251 900 0000 00</div>
            </div>

            <div className="reveal-3d glass-premium" style={{ padding: '2.5rem 1.5rem', textAlign: 'left', border: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(160, 120, 85, 0.1)', color: '#A07855', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <MapPin size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#2D2621', fontFamily: '"Playfair Display", serif' }}>Artisanal Studio</h3>
              <p style={{ color: '#5e5650', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Our visionary atelier in the heart of Addis Ababa.
              </p>
              <div style={{ marginTop: '1rem', color: '#A07855', fontWeight: 700, fontSize: '0.85rem' }}>Addis Ababa, Ethiopia</div>
            </div>

            <div className="reveal-3d" style={{ marginTop: '2rem', textAlign: 'center' }}>
               <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#A07855', marginBottom: '1rem', fontWeight: 700 }}>Follow the Movement</p>
               <a href="https://www.instagram.com/zeraf_ability/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#2D2621', fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Dancing Script", cursive', textDecoration: 'none', borderBottom: '1px solid #A07855' }}>
                  @zeraf_ability
               </a>
            </div>
          </div>

          {/* Elegant Contact Form */}
          <div className="reveal-3d glass-premium" style={{ padding: '3rem 2.5rem', border: 'none', background: 'white' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#2D2621', fontFamily: '"Playfair Display", serif' }}>Send a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07855', marginBottom: '0.75rem', display: 'block' }}>Full Name</label>
                <input type="text" style={{ width: '100%', padding: '0.85rem', background: '#fcfaf8', border: '1px solid rgba(160, 120, 85, 0.15)', borderRadius: '4px', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07855', marginBottom: '0.75rem', display: 'block' }}>Email Address</label>
                <input type="email" style={{ width: '100%', padding: '0.85rem', background: '#fcfaf8', border: '1px solid rgba(160, 120, 85, 0.15)', borderRadius: '4px', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07855', marginBottom: '0.75rem', display: 'block' }}>Inquiry Details</label>
                <textarea rows="4" style={{ width: '100%', padding: '0.85rem', background: '#fcfaf8', border: '1px solid rgba(160, 120, 85, 0.15)', borderRadius: '4px', fontSize: '0.95rem', resize: 'none' }}></textarea>
              </div>
              <button className="btn" style={{ background: '#A07855', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontWeight: 700, letterSpacing: '0.1em', marginTop: '1rem' }}>
                SUBMIT INQUIRY <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
