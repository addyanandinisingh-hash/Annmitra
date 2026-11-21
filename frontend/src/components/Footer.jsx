import React from 'react';

export default function Footer({ setCurrentPage }) {
  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
      borderTop: '1px solid var(--surface-border)',
      marginTop: '5rem',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <div className="brand-logo-icon" style={{ width: '2.2rem', height: '2.2rem', fontSize: '1.2rem' }}>🌱</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)' }}>Annmitra</h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              <strong>अन्नमित्र</strong> connects farmers directly with retail consumers, restaurants, and cooperatives. Eliminating unnecessary intermediaries to ensure fair prices for farmers and fresh produce for buyers.
            </p>
            <div className="badge badge-green">
              🌾 100% Direct Farm-to-Fork
            </div>
          </div>

          {/* Col 2: Marketplace Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Agricultural Marketplace</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#marketplace" onClick={(e) => { e.preventDefault(); navTo('marketplace'); }} style={{ color: 'var(--text-muted)' }}>
                  Fresh Vegetables (सब्जियां)
                </a>
              </li>
              <li>
                <a href="#marketplace" onClick={(e) => { e.preventDefault(); navTo('marketplace'); }} style={{ color: 'var(--text-muted)' }}>
                  Orchard Fruits (फल)
                </a>
              </li>
              <li>
                <a href="#marketplace" onClick={(e) => { e.preventDefault(); navTo('marketplace'); }} style={{ color: 'var(--text-muted)' }}>
                  Grains & Cereals (अनाज)
                </a>
              </li>
              <li>
                <a href="#marketplace" onClick={(e) => { e.preventDefault(); navTo('marketplace'); }} style={{ color: 'var(--text-muted)' }}>
                  Organic Pulses (दालें)
                </a>
              </li>
              <li>
                <a href="#marketplace" onClick={(e) => { e.preventDefault(); navTo('marketplace'); }} style={{ color: 'var(--text-muted)' }}>
                  Farm Spices (मसाले)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); navTo('home'); }} style={{ color: 'var(--text-muted)' }}>
                  Platform Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); navTo('about'); }} style={{ color: 'var(--text-muted)' }}>
                  About & 4NF Architecture
                </a>
              </li>
              <li>
                <span style={{ color: 'var(--primary-700)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navTo('farmer-dashboard')}>
                  Farmer Portal & Analytics
                </span>
              </li>
              <li>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navTo('buyer-dashboard')}>
                  Buyer Orders & Tracking
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Kisan Support & Academic Credential */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Kisan Helpline & Project</h4>
            <div style={{
              background: 'var(--surface)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary-200)',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Toll-Free Farmer Assistance
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '0.2rem' }}>
                📞 1800-ANNMITRA
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Mon - Sat: 6:00 AM - 8:00 PM
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Project: <strong>Annmitra Direct Platform</strong><br />
              Repository: <code>github.com/addyanandinisingh-hash/Annmitra</code>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--surface-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 Annmitra Agricultural Ecosystem. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>MySQL 4NF Relational Backend</span>
            <span>•</span>
            <span>Python Crop-Price Analytics</span>
            <span>•</span>
            <span>React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
