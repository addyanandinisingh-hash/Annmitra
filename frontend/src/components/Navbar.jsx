import React, { useState } from 'react';

export default function Navbar({
  currentPage,
  setCurrentPage,
  currentUser,
  setCurrentUser,
  openAuthModal,
  showToast
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast('Logged out successfully');
  };

  const navTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="brand" onClick={() => navTo('home')}>
          <div className="brand-logo-icon">🌱</div>
          <div className="brand-text">
            <h1>Annmitra</h1>
            <span>अन्नमित्र • Direct Kisan Market</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navTo('home')}
            >
              Home
            </li>
            <li
              className={`nav-link ${currentPage === 'marketplace' ? 'active' : ''}`}
              onClick={() => navTo('marketplace')}
            >
              Marketplace
            </li>
            <li
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => navTo('about')}
            >
              About Platform
            </li>

            {currentUser && currentUser.role === 'farmer' && (
              <li
                className={`nav-link ${currentPage === 'farmer-dashboard' ? 'active' : ''}`}
                onClick={() => navTo('farmer-dashboard')}
                style={{ color: 'var(--primary-700)', fontWeight: 700 }}
              >
                🚜 Farmer Dashboard
              </li>
            )}

            {currentUser && currentUser.role === 'buyer' && (
              <li
                className={`nav-link ${currentPage === 'buyer-dashboard' ? 'active' : ''}`}
                onClick={() => navTo('buyer-dashboard')}
                style={{ color: 'var(--accent-amber)', fontWeight: 700 }}
              >
                📦 Buyer Dashboard
              </li>
            )}
          </ul>
        </nav>

        {/* Actions / Auth */}
        <div className="nav-actions">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div
                style={{
                  background: currentUser.role === 'farmer' ? 'var(--primary-100)' : '#fef3c7',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: currentUser.role === 'farmer' ? 'var(--primary-900)' : '#92400e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  border: `1px solid ${currentUser.role === 'farmer' ? 'var(--primary-300)' : '#fde68a'}`
                }}
              >
                <span>{currentUser.role === 'farmer' ? '👨‍🌾' : '🛒'}</span>
                <span>{currentUser.name}</span>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={handleLogout}
                title="Log out"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => openAuthModal('farmer')}
                style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-800)' }}
              >
                👨‍🌾 Kisan Login
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => openAuthModal('buyer')}
              >
                Sign In
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
