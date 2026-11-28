import React from 'react';
import Hero from '../components/Hero';
import CropCard from '../components/CropCard';
import { CATEGORIES, CROPS } from '../data/mockData';

export default function Home({
  onSearchSubmit,
  onSelectCrop,
  onQuickOrder,
  setCurrentPage,
  openAuthModal,
  setSelectedCategory
}) {
  const featuredCrops = CROPS.slice(0, 8);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        onSearchSubmit={onSearchSubmit}
        onQuickCategory={handleCategoryClick}
        openAuthModal={openAuthModal}
        setCurrentPage={setCurrentPage}
      />

      {/* Categories Grid */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>Crop Categories</span>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--primary-950)' }}>Explore Agricultural Produce</h2>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage('marketplace');
              }}
            >
              View Full Marketplace →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem'
          }}>
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <div
                key={cat.id}
                className="card"
                role="button"
                tabIndex={0}
                aria-label={`Browse ${cat.name} crops`}
                onClick={() => handleCategoryClick(cat.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCategoryClick(cat.id);
                  }
                }}
                style={{
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid var(--surface-border)',
                  background: 'var(--surface)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{cat.count}+ Available listings</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crops */}
      <section style={{ padding: '3.5rem 0', background: 'var(--surface-alt)' }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-amber" style={{ marginBottom: '0.35rem' }}>Direct Farm Harvest</span>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--primary-950)' }}>Freshly Listed Produce</h2>
              <p style={{ marginTop: '0.25rem' }}>Harvested by verified farmers in the last 24-48 hours.</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage('marketplace')}
            >
              Browse All Crops ({CROPS.length})
            </button>
          </div>

          <div className="crops-grid">
            {featuredCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onSelectCrop={onSelectCrop}
                onQuickOrder={onQuickOrder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Annmitra Works */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>Simple 3-Step Flow</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-950)' }}>How Annmitra Works</h2>
            <p style={{ marginTop: '0.5rem' }}>
              Built to be effortless for farmers with zero technical complexity, and fully transparent for retail and bulk buyers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-100)',
                color: 'var(--primary-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 1.25rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-950)' }}>
                Farmer Lists Produce
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                Farmer adds crop name, category, available weight (kg/quintal), price, and real farm photos. Our Python price engine suggests fair mandi rates.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-amber-light)',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 1.25rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-950)' }}>
                Buyer Discovers & Orders
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                Buyers, stores, and families browse live crop listings, compare prices across different regional farmers, and place orders directly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-100)',
                color: 'var(--primary-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 1.25rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-950)' }}>
                Direct Dispatch & Delivery
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                The farmer accepts the order and packs farm-fresh crops. Status updates (Accepted $\to$ Dispatched $\to$ Delivered) persist in our 4NF database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Middlemen vs Annmitra */}
      <section style={{ padding: '4rem 0', background: 'var(--primary-950)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span className="badge badge-green" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
              Transforming Agriculture
            </span>
            <h2 style={{ fontSize: '2.1rem', color: '#ffffff', marginTop: '0.5rem' }}>
              Why Annmitra is Better
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
              Traditional mandi supply chains have 4-6 intermediaries, taking up to 55% of the consumer's rupee.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Traditional Mandi */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>❌</span> Traditional Intermediary System
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                <li>• Multiple middlemen (Arhatiya, Dalal, Wholesaler, Sub-dealer)</li>
                <li>• Farmers receive only 30% to 45% of retail price</li>
                <li>• Delayed payments and debt traps</li>
                <li>• 3-5 days in transit leading to heavy spoilage</li>
                <li>• No direct connection between producer and consumer</li>
              </ul>
            </div>

            {/* Annmitra Direct */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.2), rgba(34, 197, 94, 0.1))',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <h3 style={{ color: '#4ade80', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>✅</span> Annmitra Direct Platform
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#f0fdf4', fontSize: '0.92rem' }}>
                <li>• Zero commission and zero arbitrary cuts</li>
                <li>• Farmers retain 85% to 95% of retail value</li>
                <li>• Direct order confirmations and prompt settlements</li>
                <li>• Plucked fresh at sunrise and dispatched directly</li>
                <li>• Transparent ratings, reviews, and repeat buyer relationships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Join Section */}
      <section style={{ padding: '4.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-800), var(--primary-900))',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            color: 'white',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '920px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '1rem' }}>
              Are You a Farmer Ready for Direct Market Access?
            </h2>
            <p style={{ color: 'var(--primary-200)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              Join thousands of Indian farmers who are getting fair prices, transparent suggestions, and direct buyers through Annmitra.
            </p>
            <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
              <button
                className="btn btn-accent btn-lg"
                onClick={() => openAuthModal('farmer')}
              >
                👨‍🌾 Register as Farmer
              </button>
              <button
                className="btn btn-outline btn-lg"
                style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: 'white' }}
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage('marketplace');
                }}
              >
                Browse Vegetables
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
