import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import About from './pages/About';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CropDetailModal from './components/CropDetailModal';
import AuthModal from './components/AuthModal';
import { CROPS, DEMO_BUYER } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null); // null, farmer object, buyer object
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

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'farmer') {
      setCurrentPage('farmer-dashboard');
    } else {
      setCurrentPage('buyer-dashboard');
    }
  };

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

    // If not logged in as buyer, set user as buyer
    if (!currentUser) {
      setCurrentUser({
        ...DEMO_BUYER,
        name: buyerName,
        phone: buyerPhone
      });
    }

    setSelectedCrop(null);
    showToast(`Order #${newOrderId} placed successfully! Direct confirmation dispatched to ${crop.farmer.name}.`);
    setCurrentPage('buyer-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
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
          <FarmerDashboard
            currentUser={currentUser}
            crops={crops}
            setCrops={setCrops}
            showToast={showToast}
          />
        )}

        {currentPage === 'buyer-dashboard' && (
          <BuyerDashboard
            currentUser={currentUser}
            buyerOrders={buyerOrders}
            setBuyerOrders={setBuyerOrders}
            setCurrentPage={setCurrentPage}
            showToast={showToast}
          />
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
