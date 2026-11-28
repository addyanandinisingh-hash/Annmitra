import React, { useState } from 'react';

export default function CropDetailModal({ crop, onClose, onPlaceOrder }) {
  const [orderQuantity, setOrderQuantity] = useState(crop.minOrder || 10);
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 402, Green Acres, Thane West, Mumbai');
  const [buyerName, setBuyerName] = useState('Addya Singh');
  const [buyerPhone, setBuyerPhone] = useState('+91 98765 00112');
  const [submitting, setSubmitting] = useState(false);

  if (!crop) return null;

  const totalAmount = orderQuantity * crop.price;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      onPlaceOrder({
        crop,
        orderQuantity,
        totalAmount,
        deliveryAddress,
        buyerName,
        buyerPhone
      });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.25rem' }}>{crop.category}</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-900)' }}>{crop.name} ({crop.hindiName})</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Crop Banner Image & Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '220px' }}>
              <img
                src={crop.image}
                alt={crop.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{
                background: 'var(--primary-50)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--primary-200)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Direct Farm-Gate Price
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-900)', fontFamily: 'var(--font-heading)' }}>
                  ₹{crop.price} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/{crop.unit}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  📦 Available stock: <strong>{crop.availableQuantity} {crop.unit}</strong> • Min Order: <strong>{crop.minOrder} {crop.unit}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {crop.description}
              </div>
            </div>
          </div>

          {/* Farmer Card */}
          <div style={{
            background: 'var(--surface-alt)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--surface-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <div className="flex items-center gap-3">
              <div style={{
                width: '2.8rem',
                height: '2.8rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                color: 'white'
              }}>
                👨‍🌾
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{crop.farmer.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{crop.farmer.farmName} • 📍 {crop.farmer.location}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b' }}>★ {crop.farmer.rating}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)', fontWeight: 600 }}>Verified Kisan</div>
            </div>
          </div>

          {/* Direct Order Form */}
          <form onSubmit={handleSubmitOrder}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Direct Purchase Order Details
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Quantity to Order ({crop.unit})</label>
                <input
                  type="number"
                  min={crop.minOrder || 1}
                  max={crop.availableQuantity}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Calculated Subtotal</label>
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: 'var(--primary-800)'
                }}>
                  ₹{totalAmount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Delivery Address (Stored in 4NF ORDER_ADDRESSES)</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Recipient Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Contact Phone</label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center" style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>

              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                {submitting ? 'Placing Order...' : `Place Direct Order (₹${totalAmount.toLocaleString()})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
