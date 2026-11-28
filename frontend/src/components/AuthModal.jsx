import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, defaultRole = 'buyer', onLoginSuccess, showToast }) {
  const { login, register, clearAuthError } = useAuth();

  const [activeTab, setActiveTab] = useState(defaultRole === 'farmer' ? 'farmer-login' : 'buyer-login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync the tab whenever the modal opens with a specific role (e.g. "Kisan Login" vs "Sign In")
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultRole === 'farmer' ? 'farmer-login' : 'buyer-login');
      setFormError('');
      clearAuthError();
    }
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormError('');
    setPassword('');
    setConfirmPassword('');
    clearAuthError();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhone('');
    setFarmName('');
    setLocation('');
    setFormError('');
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() || !password) {
      setFormError('Please enter both your email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedInUser = await login(email.trim(), password);
      showToast(`Welcome back, ${loggedInUser.name}!`);
      resetForm();
      onLoginSuccess(loggedInUser);
      onClose();
    } catch (error) {
      setFormError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');

    const isFarmer = activeTab === 'farmer-register';

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (isFarmer && !farmName.trim()) {
      setFormError('Please enter your farm or agricultural land name.');
      return;
    }

    if (!isFarmer && !location.trim()) {
      setFormError('Please enter your city or delivery region.');
      return;
    }

    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        name: fullName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        role: isFarmer ? 'farmer' : 'buyer',
        ...(isFarmer ? { farmName: farmName.trim() } : {}),
        location: location.trim() || 'India'
      };

      const registeredUser = await register(userData);
      showToast(`Account registered as ${registeredUser.role === 'farmer' ? 'Farmer' : 'Buyer'}!`);
      resetForm();
      onLoginSuccess(registeredUser);
      onClose();
    } catch (error) {
      setFormError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => switchTab('farmer-login')}
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
            onClick={() => switchTab('buyer-login')}
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
          {/* Validation & API Error Banner */}
          {formError && (
            <div
              role="alert"
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              ⚠️ {formError}
            </div>
          )}

          {/* Farmer Login Form */}
          {activeTab === 'farmer-login' && (
            <form onSubmit={handleLogin} noValidate>
              <div className="input-group">
                <label className="input-label">Farmer Email Address</label>
                <input
                  type="email"
                  placeholder="ramesh.farmer@annmitra.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In to Kisan Dashboard'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                New farmer?{' '}
                <span
                  style={{ color: 'var(--primary-700)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => switchTab('farmer-register')}
                >
                  Register Farm Account
                </span>
              </div>
            </form>
          )}

          {/* Buyer Login Form */}
          {activeTab === 'buyer-login' && (
            <form onSubmit={handleLogin} noValidate>
              <div className="input-group">
                <label className="input-label">Buyer Email Address</label>
                <input
                  type="email"
                  placeholder="buyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-block"
                style={{ marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In to Buyer Account'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                New buyer?{' '}
                <span
                  style={{ color: 'var(--accent-amber)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => switchTab('buyer-register')}
                >
                  Create Buyer Profile
                </span>
              </div>
            </form>
          )}

          {/* Registration Form (Farmer or Buyer) */}
          {(activeTab === 'farmer-register' || activeTab === 'buyer-register') && (
            <form onSubmit={handleRegister} noValidate>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
                Already registered?{' '}
                <span
                  style={{ color: 'var(--primary-700)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => switchTab(activeTab === 'farmer-register' ? 'farmer-login' : 'buyer-login')}
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
