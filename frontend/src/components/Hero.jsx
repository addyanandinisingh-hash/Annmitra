import React, { useState } from 'react';

export default function Hero({ onSearchSubmit, onQuickCategory, openAuthModal, setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim());
    } else {
      setCurrentPage('marketplace');
    }
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
      padding: '4.5rem 0 3.5rem',
      borderBottom: '1px solid var(--surface-border)',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Rings */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-80px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, rgba(240, 253, 244, 0) 70%)',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Pill */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span className="badge badge-green" style={{ padding: '0.4rem 0.95rem', fontSize: '0.82rem' }}>
              🇮🇳 सशक्त किसान, समृद्ध समाज • Direct Agri Marketplace
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            color: 'var(--primary-950)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            fontWeight: 800
          }}>
            खेत से सीधा आपकी थाली तक
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            marginBottom: '2.25rem',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 2.25rem'
          }}>
            India’s dedicated direct farmer marketplace. Buy fresh vegetables, fruits, and grains directly from verified farmers without commission cuts or middleman markups.
          </p>

          {/* Search Bar Form */}
          <form
            onSubmit={handleSearch}
            style={{
              background: 'var(--surface)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--primary-200)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              maxWidth: '650px',
              margin: '0 auto 1.5rem'
            }}
          >
            <span style={{ fontSize: '1.4rem', paddingLeft: '1rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search fresh crops e.g. 'Tomato', 'Nashik Onion', 'Palak'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                fontFamily: 'var(--font-main)',
                width: '100%',
                padding: '0.75rem 0.5rem',
                background: 'transparent'
              }}
            />
            <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
              Find Crops
            </button>
          </form>

          {/* Quick Trending Chips */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem'
          }}>
            <span style={{ fontWeight: 600 }}>Popular:</span>
            {['Tomato (टमाटर)', 'Red Onion (प्याज)', 'Potato (आलू)', 'Spinach (पालक)', 'Green Chilli', 'Shimla Apple'].map((item) => (
              <span
                key={item}
                onClick={() => onSearchSubmit(item.split(' ')[0])}
                style={{
                  background: 'var(--surface)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-500)';
                  e.currentTarget.style.color = 'var(--primary-800)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Trust Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'var(--surface)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.75rem' }}>🚜</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>100% Verified Kisans</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Genuine local farm source</div>
              </div>
            </div>

            <div style={{
              background: 'var(--surface)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.75rem' }}>💰</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>Zero Intermediary Cut</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fair price for farm produce</div>
              </div>
            </div>

            <div style={{
              background: 'var(--surface)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.75rem' }}>📊</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>Smart Price Engine</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mandi price transparency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
