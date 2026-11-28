import React, { useState } from 'react';
import { PRICE_SUGGESTIONS, CATEGORIES } from '../data/mockData';

export default function FarmerDashboard({ currentUser, crops, setCrops, showToast }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddModal, setShowAddModal] = useState(false);

  // Incoming orders interactive state
  const [orders, setOrders] = useState([
    {
      orderId: 'ORD-2026-894',
      buyerName: 'Priya Sharma (Retail Buyer)',
      cropName: 'Desi Hybrid Tomato',
      quantity: '50 kg',
      totalAmount: 1200,
      placedAt: '2 hours ago',
      status: 'Pending',
      address: 'Shop 14, APMC Market, Vashi, Navi Mumbai'
    },
    {
      orderId: 'ORD-2026-889',
      buyerName: 'FreshBasket Supermarket',
      cropName: 'Organic Palak (Spinach)',
      quantity: '40 kg',
      totalAmount: 1120,
      placedAt: '5 hours ago',
      status: 'Pending',
      address: 'Warehouse 3, Chakan Industrial Area, Pune'
    },
    {
      orderId: 'ORD-2026-872',
      buyerName: 'Amit Verma (Home Consumer)',
      cropName: 'Tender Okra / Bhindi',
      quantity: '15 kg',
      totalAmount: 630,
      placedAt: 'Yesterday',
      status: 'Accepted',
      address: 'Flat 402, Green Acres, Thane West'
    },
    {
      orderId: 'ORD-2026-860',
      buyerName: 'Swiggy Instamart Hub',
      cropName: 'Snowball Cauliflower',
      quantity: '120 kg',
      totalAmount: 3600,
      placedAt: '18 Nov 2026',
      status: 'Completed',
      address: 'Fulfillment Hub 7, Bhiwandi'
    }
  ]);

  // Form state for adding new crop
  const [newCropName, setNewCropName] = useState('');
  const [newHindiName, setNewHindiName] = useState('');
  const [newCategory, setNewCategory] = useState('vegetables');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newQuantity, setNewQuantity] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newHarvestDate, setNewHarvestDate] = useState('2026-11-21');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Stats calculation
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const acceptedCount = orders.filter(o => o.status === 'Accepted').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length;

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} marked as ${newStatus}! (Recorded in 4NF ORDER_STATUS_HISTORY)`);
  };

  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    const newCrop = {
      id: Date.now(),
      name: newCropName,
      hindiName: newHindiName || newCropName,
      category: newCategory,
      price: Number(newPrice),
      unit: newUnit,
      minOrder: 5,
      availableQuantity: Number(newQuantity),
      harvestDate: newHarvestDate,
      description: newDescription || 'Fresh harvest directly from farm.',
      image: newImageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      farmer: {
        id: currentUser ? currentUser.id : 101,
        name: currentUser ? currentUser.name : 'Ramesh Patel',
        farmName: currentUser ? (currentUser.farmName || 'Patel Organic Farms') : 'Patel Organic Farms',
        location: currentUser ? (currentUser.location || 'Nashik, Maharashtra') : 'Nashik, Maharashtra',
        rating: 4.9,
        reviewsCount: 1,
        verified: true,
        phone: '+91 98231 45678'
      },
      badge: 'New Harvest'
    };

    setCrops(prev => [newCrop, ...prev]);
    showToast(`Crop "${newCropName}" added to Marketplace!`);
    setShowAddModal(false);
    // Reset form
    setNewCropName('');
    setNewHindiName('');
    setNewPrice('');
    setNewQuantity('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Farmer Profile Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-900), var(--primary-800))',
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
              background: 'var(--primary-700)',
              border: '2px solid var(--primary-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              👨‍🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
                  {currentUser ? currentUser.name : 'Ramesh Patel'}
                </h1>
                <span className="badge badge-green" style={{ background: '#22c55e', color: '#052e16' }}>
                  ✓ Verified Kisan
                </span>
              </div>
              <p style={{ color: 'var(--primary-200)', marginTop: '0.2rem' }}>
                {currentUser?.farmName || 'Patel Organic Farms'} • 📍 {currentUser?.location || 'Nashik, Maharashtra'} • ID: <code>FARMER_101</code>
              </p>
            </div>
          </div>

          <button
            className="btn btn-accent btn-lg"
            onClick={() => setShowAddModal(true)}
            style={{ boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)' }}
          >
            ➕ List New Crop
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
            <div className="stat-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary-800)' }}>
              🌾
            </div>
            <div>
              <div className="stat-val">{crops.filter(c => c.farmer.name === (currentUser?.name || 'Ramesh Patel')).length || 4}</div>
              <div className="stat-label">Active Listings</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              ⏳
            </div>
            <div>
              <div className="stat-val" style={{ color: '#b45309' }}>{pendingCount}</div>
              <div className="stat-label">Pending Orders</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
              🚚
            </div>
            <div>
              <div className="stat-val" style={{ color: '#1d4ed8' }}>{acceptedCount}</div>
              <div className="stat-label">Accepted / In Transit</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
              💰
            </div>
            <div>
              <div className="stat-val" style={{ color: '#15803d' }}>₹78,500</div>
              <div className="stat-label">Total Realized Sales</div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid var(--surface-border)',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.85rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'orders' ? '3px solid var(--primary-600)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '1rem',
              color: activeTab === 'orders' ? 'var(--primary-800)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            📦 Incoming Buyer Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            style={{
              padding: '0.85rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'listings' ? '3px solid var(--primary-600)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '1rem',
              color: activeTab === 'listings' ? 'var(--primary-800)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            🌱 My Crop Listings
          </button>

          <button
            onClick={() => setActiveTab('suggestions')}
            style={{
              padding: '0.85rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'suggestions' ? '3px solid var(--accent-amber)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '1rem',
              color: activeTab === 'suggestions' ? 'var(--accent-amber)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            🤖 AI Crop-Price Suggestions
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Buyer Order Requests</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Persistent in MySQL <code>ORDERS</code> & <code>ORDER_ITEMS</code> tables
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}
                >
                  <div style={{ flex: '1 1 300px' }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary-900)' }}>{order.orderId}</span>
                      <span
                        className="badge"
                        style={{
                          background: order.status === 'Pending' ? '#fef3c7' : (order.status === 'Accepted' ? '#dbeafe' : '#dcfce7'),
                          color: order.status === 'Pending' ? '#92400e' : (order.status === 'Accepted' ? '#1e40af' : '#166534')
                        }}
                      >
                        {order.status}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• {order.placedAt}</span>
                    </div>

                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {order.cropName} — {order.quantity}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Buyer: <strong>{order.buyerName}</strong> • Delivery: {order.address}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payout Amount</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-800)', fontFamily: 'var(--font-heading)' }}>
                      ₹{order.totalAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleUpdateOrderStatus(order.orderId, 'Accepted')}
                        >
                          ✓ Accept Order
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                          onClick={() => handleUpdateOrderStatus(order.orderId, 'Rejected')}
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}

                    {order.status === 'Accepted' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleUpdateOrderStatus(order.orderId, 'Completed')}
                      >
                        🚚 Mark Delivered
                      </button>
                    )}

                    {order.status === 'Completed' && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                        ✓ Order Fulfilled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LISTINGS */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Your Live Farm Listings</h3>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
                ➕ Add New Crop
              </button>
            </div>

            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--surface-border)' }}>
                  <tr>
                    <th style={{ padding: '0.85rem 1rem' }}>Crop Produce</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Price</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Available Stock</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Harvest Date</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.slice(0, 6).map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div className="flex items-center gap-3">
                          <img src={c.image} alt={c.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.hindiName}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textTransform: 'capitalize' }}>{c.category}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                        ₹{c.price}/{c.unit}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>{c.availableQuantity} {c.unit}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{c.harvestDate}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="badge badge-green">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRICE SUGGESTIONS */}
        {activeTab === 'suggestions' && (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fffbeb)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #fde68a',
              marginBottom: '2rem'
            }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🤖</span>
                <h3 style={{ fontSize: '1.25rem', color: '#92400e' }}>
                  Intelligent Crop-Price Engine (Python Module Preview)
                </h3>
              </div>
              <p style={{ color: '#78350f', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Annmitra connects with our Python statistical analytics engine to compare regional APMC mandi rates, historical averages, and local supply levels. Suggestions are explainable and purely advisory — <strong>you always decide your final selling price.</strong>
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {PRICE_SUGGESTIONS.map((sug, idx) => (
                <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{sug.crop}</h4>
                    <span className="badge badge-amber">{sug.trend}</span>
                  </div>

                  <div style={{
                    background: 'var(--surface-alt)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mandi Average</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{sug.marketAverage}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary-800)', fontWeight: 600 }}>Suggested Direct Price</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary-700)', fontSize: '1.1rem' }}>{sug.recommended}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    <strong>Engine Rationale:</strong> {sug.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW CROP */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--surface-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)' }}>
                  🌾 List New Crop on Annmitra
                </h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleAddCropSubmit} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Crop Name (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Desi Hybrid Tomato"
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Crop Name (Hindi)</label>
                    <input
                      type="text"
                      placeholder="e.g. टमाटर"
                      value={newHindiName}
                      onChange={(e) => setNewHindiName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="select-field"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Unit of Measure</label>
                    <select
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      className="select-field"
                    >
                      <option value="kg">Kilogram (kg)</option>
                      <option value="quintal">Quintal (100 kg)</option>
                      <option value="crate">Crate (approx 20 kg)</option>
                      <option value="dozen">Dozen</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Price per Unit (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 24"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Available Quantity</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Photo Image URL (Demo)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="input-field"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Tip: Leave blank to use our default fresh farm produce image.
                  </span>
                </div>

                <div className="input-group">
                  <label className="input-label">Crop Quality & Description</label>
                  <textarea
                    rows="3"
                    placeholder="Describe harvest quality, moisture, freshness..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="textarea-field"
                  />
                </div>

                <div className="flex justify-between items-center" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Publish Listing to Marketplace
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
