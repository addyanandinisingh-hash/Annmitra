import React, { useState, useMemo } from 'react';
import CropCard from '../components/CropCard';
import { CATEGORIES } from '../data/mockData';

export default function Marketplace({
  crops,
  onSelectCrop,
  onQuickOrder,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Distinct locations from crop data
  const locations = useMemo(() => {
    const locSet = new Set();
    crops.forEach(c => {
      const city = c.farmer.location.split(',')[0].trim();
      locSet.add(city);
    });
    return Array.from(locSet);
  }, [crops]);

  // Filtering & Sorting
  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
      // Category filter
      if (selectedCategory !== 'all' && crop.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'all' && !crop.farmer.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = crop.name.toLowerCase().includes(query);
        const matchesHindi = crop.hindiName.includes(query);
        const matchesFarmer = crop.farmer.name.toLowerCase().includes(query);
        const matchesLocation = crop.farmer.location.toLowerCase().includes(query);
        const matchesDesc = crop.description.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesFarmer && !matchesLocation && !matchesDesc) {
          return false;
        }
      }

      // Price Range filter
      if (priceRange === 'under-30' && crop.price >= 30) return false;
      if (priceRange === '30-60' && (crop.price < 30 || crop.price > 60)) return false;
      if (priceRange === '60-150' && (crop.price < 60 || crop.price > 150)) return false;
      if (priceRange === 'above-150' && crop.price <= 150) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.farmer.rating - a.farmer.rating;
      if (sortBy === 'quantity') return b.availableQuantity - a.availableQuantity;
      return 0; // recommended
    });
  }, [crops, selectedCategory, selectedLocation, searchQuery, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: 'var(--primary-700)', fontWeight: 600 }}>Agricultural Marketplace</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--primary-950)' }}>
            Direct Farmer Crop Marketplace
          </h1>
          <p style={{ marginTop: '0.35rem' }}>
            Discover fresh vegetables, fruits, and grains listed directly by verified regional farmers.
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.75rem',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${isActive ? 'var(--primary-600)' : 'var(--surface-border)'}`,
                  background: isActive ? 'var(--primary-700)' : 'var(--surface)',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 10px rgba(21, 128, 61, 0.25)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--surface-alt)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  marginLeft: '0.2rem'
                }}>
                  {cat.id === 'all' ? crops.length : crops.filter(c => c.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          background: 'var(--surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            {/* Search Input */}
            <div>
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Search Produce / Farmer</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Ramesh Patel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{ paddingRight: searchQuery ? '2rem' : '1rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '0.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-light)',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Mandi / Region</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="select-field"
              >
                <option value="all">All Farm Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>📍 {loc}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="select-field"
              >
                <option value="all">All Prices</option>
                <option value="under-30">Budget: Under ₹30 / kg</option>
                <option value="30-60">Standard: ₹30 - ₹60 / kg</option>
                <option value="60-150">Premium: ₹60 - ₹150 / kg</option>
                <option value="above-150">Specialty / Dried: Above ₹150 / kg</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-field"
              >
                <option value="recommended">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Farmer Rating (High to Low)</option>
                <option value="quantity">Available Quantity (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata & Reset */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Showing <span style={{ color: 'var(--primary-700)' }}>{filteredCrops.length}</span> fresh crops available
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            {selectedCategory !== 'all' && <span> in <strong>{CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></span>}
          </div>

          {(selectedCategory !== 'all' || selectedLocation !== 'all' || priceRange !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-orange)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              🔄 Clear All Filters
            </button>
          )}
        </div>

        {/* Crops Grid */}
        {filteredCrops.length > 0 ? (
          <div className="crops-grid">
            {filteredCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onSelectCrop={onSelectCrop}
                onQuickOrder={onQuickOrder}
              />
            ))}
          </div>
        ) : (
          <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--surface-border)',
            margin: '2rem 0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              No crops found matching your filters
            </h3>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.92rem' }}>
              Try searching for common vegetables like 'Tomato', 'Onion', 'Potato' or reset all active category and location filters.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
