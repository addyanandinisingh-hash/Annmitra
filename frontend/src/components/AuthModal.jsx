import React, { useState } from 'react';
import { DEMO_FARMER, DEMO_BUYER } from '../data/mockData';

export default function AuthModal({ isOpen, onClose, defaultRole = 'buyer', onLoginSuccess, showToast }) {
  const [activeTab, setActiveTab] = useState(defaultRole === 'farmer' ? 'farmer-login' : 'buyer-login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  const handleFarmerLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({
      ...DEMO_FARMER,
      name: email.split('@')[0] || DEMO_FARMER.name,
      email: email || DEMO_FARMER.email
    });
    showToast('Logged in as Farmer successfully!');
    onClose();
  };

  const handleBuyerLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({
      ...DEMO_BUYER,
      name: email.split('@')[0] || DEMO_BUYER.name,
      email: email || DEMO_BUYER.email
    });
    showToast('Logged in as Buyer successfully!');
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isFarmer = activeTab === 'farmer-register';
    const newUser = {
      id: Date.now(),
      name: fullName || (isFarmer ? 'New Kisan' : 'New Buyer'),
      email,
      phone,
      role: isFarmer ? 'farmer' : 'buyer',
      farmName: isFarmer ? farmName : undefined,
      location: location || 'India',
      stats: isFarmer ? {
        activeListings: 1,
        totalOrders: 0,
        pendingOrders: 0,
        acceptedOrders: 0,
        completedOrders: 0,
        totalEarnings: 0
      } : {
        totalOrders: 0,
        activeOrders: 0,
        completedOrders: 0,
        savedAddresses: 1
      },
      orders: [],
      incomingOrders: []
    };
    onLoginSuccess(newUser);
    showToast(`Account registered as ${isFarmer ? 'Farmer' : 'Buyer'}!`);
    onClose();
  };

  const handleGoogleOAuthSimulation = () => {
    // In accordance with instructions: Explain that real credentials will be plugged in Phase 4/5
    showToast('Google OAuth 2.0 endpoint ready. Configured to receive Client ID in backend/.env');
    const isFarmer = activeTab.includes('farmer');
    onLoginSuccess(isFarmer ? DEMO_FARMER : DEMO_BUYER);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.4rem' }}>🌱</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-900)' }}>
              Annmitra Account Access
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--surface-border)',
          background: 'var(--surface-alt)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('farmer-login')}
            style={{
              padding: '0.85rem',
              border: 'none',
              background: activeTab.startsWith('farmer') ? 'var(--surface)' : 'transparent',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab.startsWith('farmer') ? 'var(--primary-800)' : 'var(--text-muted)',
              borderBottom: activeTab.startsWith('farmer') ? '2.5px solid var(--primary-600)' : 'none',
              cursor: 'pointer'
            }}
          >
            👨‍🌾 Kisan Portal (Farmer)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buyer-login')}
            style={{
              padding: '0.85rem',
              border: 'none',
              background: activeTab.startsWith('buyer') ? 'var(--surface)' : 'transparent',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeTab.startsWith('buyer') ? 'var(--accent-amber)' : 'var(--text-muted)',
              borderBottom: activeTab.startsWith('buyer') ? '2.5px solid var(--accent-amber)' : 'none',
              cursor: 'pointer'
            }}
          >
            🛒 Buyer / Consumer
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Quick Demo Login Helpers */}
          <div style={{
            background: 'var(--primary-50)',
            border: '1px dashed var(--primary-500)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.35rem' }}>
              ⚡ Instant Quick Test (One-Click)
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onLoginSuccess(DEMO_FARMER);
                  showToast('Logged in as Demo Farmer: Ramesh Patel');
                  onClose();
                }}
              >
                Log In as Demo Farmer
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  onLoginSuccess(DEMO_BUYER);
                  showToast('Logged in as Demo Buyer: Addya Singh');
                  onClose();
                }}
              >
                Log In as Demo Buyer
              </button>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleOAuthSimulation}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface)',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text-main)',
              cursor: 'pointer',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            Sign in with Google
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.25rem 0',
            color: 'var(--text-light)',
            fontSize: '0.82rem'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
            <span style={{ padding: '0 0.75rem' }}>OR CONTINUE WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
          </div>

          {/* Login or Register Form */}
          {activeTab === 'farmer-login' && (
            <form onSubmit={handleFarmerLogin}>
              <div className="input-group">
                <label className="input-label">Farmer Email or Registered Mobile</label>
                <input
                  type="text"
                  placeholder="ramesh.farmer@annmitra.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
                Sign In to Kisan Dashboard
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                New farmer?{' '}
                <span
                  style={{ color: 'var(--primary-700)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setActiveTab('farmer-register')}
                >
                  Register Farm Account
                </span>
              </div>
            </form>
          )}

          {activeTab === 'buyer-login' && (
            <form onSubmit={handleBuyerLogin}>
              <div className="input-group">
                <label className="input-label">Buyer Email Address</label>
                <input
                  type="email"
                  placeholder="buyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent btn-block" style={{ marginTop: '0.5rem' }}>
                Sign In to Buyer Account
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                New buyer?{' '}
                <span
                  style={{ color: 'var(--accent-amber)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setActiveTab('buyer-register')}
                >
                  Create Buyer Profile
                </span>
              </div>
            </form>
          )}

          {(activeTab === 'farmer-register' || activeTab === 'buyer-register') && (
            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Mobile Number (with WhatsApp)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {activeTab === 'farmer-register' ? (
                <div className="input-group">
                  <label className="input-label">Farm or Agricultural Land Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Kisan Organic Fields"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              ) : (
                <div className="input-group">
                  <label className="input-label">City / Delivery Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Navi Mumbai, Pune"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Create Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Complete Registration
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                Already registered?{' '}
                <span
                  style={{ color: 'var(--primary-700)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setActiveTab(activeTab === 'farmer-register' ? 'farmer-login' : 'buyer-login')}
                >
                  Sign In instead
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
