import React from 'react';

export default function About({ setCurrentPage, openAuthModal }) {
  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
            Academic Project & Platform Architecture
          </span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-950)', marginBottom: '1rem' }}>
            About Annmitra (अन्नमित्र)
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            A Farmer Direct Market Access Platform engineered to eradicate exploitative intermediary commissions, guaranteeing remunerative returns for Indian farmers and fresh, certified produce for buyers.
          </p>
        </div>

        {/* Core Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌾</div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-950)', marginBottom: '0.5rem' }}>
              Farmer Direct Empowerment
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
              In traditional Indian mandis, farmers often surrender 30% to 50% of the terminal consumer price to commission agents (Arhatiyas). Annmitra provides a digital market stall where farmers set their prices, communicate with buyers, and receive direct payments.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗄️</div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-950)', marginBottom: '0.5rem' }}>
              Academic 4NF MySQL Database
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
              Our relational database strictly adheres to <strong>Fourth Normal Form (4NF)</strong>. By decomposing multivalued dependencies into isolated relations (such as <code>USER_ROLES</code>, <code>LISTING_IMAGES</code>, <code>ORDER_ADDRESSES</code>, and <code>ORDER_STATUS_HISTORY</code>), we eliminate all multi-valued anomalies and enforce referential integrity.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🐍</div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-950)', marginBottom: '0.5rem' }}>
              Python Price Intelligence
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
              A dedicated Python microservice computes statistical moving averages, mandi interquartile ranges, and localized seasonal supply metrics. It presents explainable price suggestions without forcing algorithmic decisions upon the farmer.
            </p>
          </div>
        </div>

        {/* Database Entities Showcase */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '4rem'
        }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-950)', marginBottom: '1rem' }}>
            Relational 4NF Database Entities
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Approved academic database design spanning 17 normalized entities:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}>
            {[
              'USERS', 'ROLES', 'USER_ROLES', 'FARMER_PROFILES', 'BUYER_PROFILES',
              'ADMIN_PROFILES', 'OAUTH_ACCOUNTS', 'ADDRESSES', 'CROP_CATEGORIES',
              'CROP_LISTINGS', 'LISTING_IMAGES', 'ORDERS', 'ORDER_ITEMS',
              'ORDER_ADDRESSES', 'ORDER_STATUS_HISTORY', 'REVIEWS', 'COMPLAINTS'
            ].map((table) => (
              <div
                key={table}
                style={{
                  background: 'var(--surface-alt)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--primary-800)',
                  border: '1px solid var(--primary-200)',
                  textAlign: 'center'
                }}
              >
                {table}
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-900), var(--primary-800))',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            Annmitra Academic Project
          </h3>
          <p style={{ color: 'var(--primary-200)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Developed by <strong>Addya Nandini Singh</strong><br />
            GitHub Repository: <code>https://github.com/addyanandinisingh-hash/Annmitra</code>
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn btn-accent" onClick={() => setCurrentPage('marketplace')}>
              Explore Marketplace Now
            </button>
            <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }} onClick={() => openAuthModal('farmer')}>
              Kisan Portal Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
