import React, { useState } from 'react';

export default function BuyerDashboard({ currentUser, buyerOrders, setBuyerOrders, setCurrentPage, showToast }) {
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    showToast(`Review for ${selectedOrderForReview.cropName} submitted! (Stored in 4NF REVIEWS table)`);
    setSelectedOrderForReview(null);
    setReviewComment('');
  };

  const activeOrders = buyerOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const completedOrders = buyerOrders.filter(o => o.status === 'Delivered');

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Buyer Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #78350f, #b45309)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div className="flex items-center gap-4">
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
                  {currentUser?.name || 'Addya Singh'}
                </h1>
                <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#92400e' }}>
                  Verified Buyer
                </span>
              </div>
              <p style={{ color: '#fed7aa', marginTop: '0.2rem' }}>
                {currentUser?.buyerType || 'Retail Store & Household Consumer'} • 📍 {currentUser?.location || 'Mumbai, Maharashtra'}
              </p>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => setCurrentPage('marketplace')}
            style={{ background: '#ffffff', color: 'var(--primary-900)' }}
          >
            🥦 Browse Fresh Crops
          </button>
        </div>

        {/* Statistical Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              📦
            </div>
            <div>
              <div className="stat-val">{buyerOrders.length}</div>
              <div className="stat-label">Total Orders Placed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
              🚚
            </div>
            <div>
              <div className="stat-val" style={{ color: '#1d4ed8' }}>{activeOrders.length}</div>
              <div className="stat-label">Active Dispatches</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              ✅
            </div>
            <div>
              <div className="stat-val" style={{ color: '#15803d' }}>{completedOrders.length}</div>
              <div className="stat-label">Delivered Purchases</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--surface-alt)', color: 'var(--text-main)' }}>
              📍
            </div>
            <div>
              <div className="stat-val">2</div>
              <div className="stat-label">Saved Addresses</div>
            </div>
          </div>
        </div>

        {/* Active Order Tracking */}
        {activeOrders.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              🚚 Active Order Live Tracking
            </h3>

            {activeOrders.map((order) => (
              <div key={order.orderId} className="card" style={{ padding: '1.75rem', marginBottom: '1rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--primary-900)', fontSize: '1.1rem' }}>
                      {order.orderId}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                      • Placed on {order.placedAt}
                    </span>
                  </div>
                  <span className="badge badge-amber" style={{ fontSize: '0.82rem' }}>
                    Status: {order.status}
                  </span>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {order.cropName} ({order.quantity})
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Kisan: <strong>{order.farmerName}</strong> • Total Paid: <strong>₹{order.totalAmount.toLocaleString()}</strong>
                </div>

                {/* Tracking Progress Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  position: 'relative',
                  marginTop: '1rem'
                }}>
                  {[
                    { step: 1, label: 'Order Placed', done: true },
                    { step: 2, label: 'Accepted by Kisan', done: (order.trackingStep || 2) >= 2 },
                    { step: 3, label: 'Dispatched / In Transit', done: (order.trackingStep || 2) >= 3 },
                    { step: 4, label: 'Delivered', done: (order.trackingStep || 2) >= 4 }
                  ].map((s) => (
                    <div key={s.step} style={{ textAlign: 'center' }}>
                      <div style={{
                        height: '6px',
                        borderRadius: 'var(--radius-full)',
                        background: s.done ? 'var(--primary-500)' : 'var(--surface-border)',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div style={{
                        fontSize: '0.78rem',
                        fontWeight: s.done ? 700 : 500,
                        color: s.done ? 'var(--primary-800)' : 'var(--text-light)'
                      }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Purchase History Table */}
        <div>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
              Complete Purchase History
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Stored in MySQL <code>ORDERS</code> & <code>ORDER_ITEMS</code> tables
            </span>
          </div>

          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--surface-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--surface-border)' }}>
                <tr>
                  <th style={{ padding: '0.85rem 1rem' }}>Order ID</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Crop Produce</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Farmer</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Quantity</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Total Amount</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyerOrders.map((ord) => (
                  <tr key={ord.orderId} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-900)' }}>
                      {ord.orderId}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{ord.cropName}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{ord.farmerName}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>{ord.quantity}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                      ₹{ord.totalAmount.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`badge ${ord.status === 'Delivered' ? 'badge-green' : 'badge-amber'}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {ord.status === 'Delivered' ? (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedOrderForReview(ord)}
                        >
                          ★ Review Crop
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>In Fulfillment</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* REVIEW MODAL */}
        {selectedOrderForReview && (
          <div className="modal-overlay" onClick={() => setSelectedOrderForReview(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--surface-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)' }}>
                  ★ Submit Review for {selectedOrderForReview.cropName}
                </h3>
                <button onClick={() => setSelectedOrderForReview(null)} style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleReviewSubmit} style={{ padding: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Product Rating (1 to 5 Stars)</label>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.8rem', cursor: 'pointer' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{ color: star <= reviewRating ? '#f59e0b' : '#cbd5e1' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Quality Feedback & Comments</label>
                  <textarea
                    rows="3"
                    className="textarea-field"
                    placeholder="Share comments on freshness, taste, and packaging..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-between items-center" style={{ marginTop: '1.25rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedOrderForReview(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Verified Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
