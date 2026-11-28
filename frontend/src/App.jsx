import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import About from './pages/About';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CropDetailModal from './components/CropDetailModal';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';
import { CROPS, DEMO_BUYER } from './data/mockData';

export default function App() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [crops, setCrops] = useState(CROPS);
  const [buyerOrders, setBuyerOrders] = useState(DEMO_BUYER.orders);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, role: 'buyer' });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openAuthModal = (role = 'buyer') => {
    setAuthModalState({ isOpen: true, role });
  };

  const closeAuthModal = () => {
    setAuthModalState({ isOpen: false, role: 'buyer' });
  };

  // Redirect to the right dashboard after login/registration
  const handleLoginSuccess = (loggedInUser) => {
    if (loggedInUser?.role === 'farmer') {
      setCurrentPage('farmer-dashboard');
    } else {
      setCurrentPage('buyer-dashboard');
    }
  };

  // Route protection: if a user logs out or their session expires while on a dashboard,
  // redirect them back to home safely.
  useEffect(() => {
    if (!authLoading && !currentUser) {
      if (currentPage === 'farmer-dashboard' || currentPage === 'buyer-dashboard') {
        setCurrentPage('home');
      }
    }
  }, [authLoading, currentUser, currentPage]);

  const handleSearchFromHero = (query) => {
    setSearchQuery(query);
    setCurrentPage('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = ({ crop, orderQuantity, totalAmount, deliveryAddress, buyerName, buyerPhone }) => {
    const newOrderId = `ORD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      orderId: newOrderId,
      cropName: crop.name,
      farmerName: crop.farmer.name,
      quantity: `${orderQuantity} ${crop.unit}`,
      totalAmount,
      placedAt: 'Just now (Today)',
      status: 'Placed',
      trackingStep: 1,
      estimatedDelivery: '23 Nov 2026'
    };

    // Update buyer orders
    setBuyerOrders(prev => [newOrder, ...prev]);

    // Deduct stock from crop
    setCrops(prev => prev.map(c => {
      if (c.id === crop.id) {
        return {
          ...c,
          availableQuantity: Math.max(0, c.availableQuantity - orderQuantity)
        };
      }
      return c;
    }));

    // If not logged in as buyer, prompt login instead of faking a user
    setSelectedCrop(null);
    showToast(`Order #${newOrderId} placed! Direct confirmation dispatched to ${crop.farmer.name}.`);
    if (currentUser?.role === 'buyer') {
      setCurrentPage('buyer-dashboard');
    } else {
      openAuthModal('buyer');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // While checking /api/auth/me on initial load, show a clean loading screen
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '0.75rem',
        color: 'var(--primary-800)'
      }}>
        <span style={{ fontSize: '2.5rem' }}>🌱</span>
        <p style={{ fontWeight: 600 }}>Checking your Annmitra session...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openAuthModal={openAuthModal}
        showToast={showToast}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <Home
            onSearchSubmit={handleSearchFromHero}
            onSelectCrop={(crop) => setSelectedCrop(crop)}
            onQuickOrder={(crop) => setSelectedCrop(crop)}
            setCurrentPage={setCurrentPage}
            openAuthModal={openAuthModal}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentPage === 'marketplace' && (
          <Marketplace
            crops={crops}
            onSelectCrop={(crop) => setSelectedCrop(crop)}
            onQuickOrder={(crop) => setSelectedCrop(crop)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentPage === 'about' && (
          <About
            setCurrentPage={setCurrentPage}
            openAuthModal={openAuthModal}
          />
        )}

        {currentPage === 'farmer-dashboard' && (
          currentUser?.role === 'farmer' ? (
            <FarmerDashboard
              currentUser={currentUser}
              crops={crops}
              setCrops={setCrops}
              showToast={showToast}
            />
          ) : (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
              <h2>🔒 Farmer Access Required</h2>
              <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem' }}>
                Please sign in with a Farmer account to view the Kisan Dashboard.
              </p>
              <button className="btn btn-primary" onClick={() => openAuthModal('farmer')}>
                Sign In as Farmer
              </button>
            </div>
          )
        )}

        {currentPage === 'buyer-dashboard' && (
          currentUser?.role === 'buyer' ? (
            <BuyerDashboard
              currentUser={currentUser}
              buyerOrders={buyerOrders}
              setBuyerOrders={setBuyerOrders}
              setCurrentPage={setCurrentPage}
              showToast={showToast}
            />
          ) : (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
              <h2>🔒 Buyer Access Required</h2>
              <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem' }}>
                Please sign in with a Buyer account to view the Buyer Dashboard.
              </p>
              <button className="btn btn-accent" onClick={() => openAuthModal('buyer')}>
                Sign In as Buyer
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Product Detail & Order Modal */}
      {selectedCrop && (
        <CropDetailModal
          crop={selectedCrop}
          onClose={() => setSelectedCrop(null)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {/* Authentication & Role Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        defaultRole={authModalState.role}
        onClose={closeAuthModal}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      {/* Notification Toast */}
      {toast && (
        <div className="toast">
          <span>🌿</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
