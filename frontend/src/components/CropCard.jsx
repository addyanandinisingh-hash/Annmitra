import React from 'react';

export default function CropCard({ crop, onSelectCrop, onQuickOrder }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Crop Image & Badge */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <img
          src={crop.image}
          alt={crop.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 400ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap'
        }}>
          <span className="badge badge-green" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            {crop.badge}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          color: '#ffffff',
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          {crop.availableQuantity} {crop.unit} left
        </div>
      </div>

      {/* Body Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--primary-700)',
            letterSpacing: '0.04em'
          }}>
            {crop.category}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>
            ★ {crop.farmer.rating} <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>({crop.farmer.reviewsCount})</span>
          </span>
        </div>

        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
          {crop.name}
        </h3>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          {crop.hindiName} • Harvested {crop.harvestDate}
        </div>

        {/* Farmer info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
          fontSize: '0.82rem'
        }}>
          <span style={{ fontSize: '1.1rem' }}>👨‍🌾</span>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {crop.farmer.name}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              📍 {crop.farmer.location}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--surface-border)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Farm-gate Price</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-800)', fontFamily: 'var(--font-heading)' }}>
              ₹{crop.price} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>/{crop.unit}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onSelectCrop(crop)}
            >
              View & Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
