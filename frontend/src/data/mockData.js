// Comprehensive agricultural mock data for Annmitra
export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '🌾', count: 28 },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥦', count: 16 },
  { id: 'fruits', name: 'Orchard Fruits', icon: '🍎', count: 6 },
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾', count: 3 },
  { id: 'pulses', name: 'Pulses & Dal', icon: '🫘', count: 2 },
  { id: 'spices', name: 'Farm Spices', icon: '🌶️', count: 1 }
];

export const CROPS = [
  {
    id: 1,
    name: 'Desi Hybrid Tomato',
    hindiName: 'टमाटर',
    category: 'vegetables',
    price: 24,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 450,
    harvestDate: '2026-11-18',
    description: 'Juicy, naturally ripened farm-fresh desi hybrid tomatoes. Ideal for retail stores and bulk home use.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 101,
      name: 'Ramesh Patel',
      farmName: 'Patel Organic Farms',
      location: 'Nashik, Maharashtra',
      rating: 4.8,
      reviewsCount: 38,
      verified: true,
      phone: '+91 98231 45678'
    },
    badge: 'Fresh Harvest'
  },
  {
    id: 2,
    name: 'Nashik Red Onion',
    hindiName: 'लाल प्याज',
    category: 'vegetables',
    price: 32,
    unit: 'kg',
    minOrder: 25,
    availableQuantity: 1200,
    harvestDate: '2026-11-15',
    description: 'Premium cured grade-A red onions from Lasalgaon, Nashik. Medium to large size with long shelf life.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 102,
      name: 'Suresh Gaikwad',
      farmName: 'Sahyadri Agro',
      location: 'Lasalgaon, Nashik',
      rating: 4.9,
      reviewsCount: 64,
      verified: true,
      phone: '+91 94220 98765'
    },
    badge: 'Bestseller'
  },
  {
    id: 3,
    name: 'Agra Cold-Store Potato (Jyoti)',
    hindiName: 'आलू',
    category: 'vegetables',
    price: 18,
    unit: 'kg',
    minOrder: 50,
    availableQuantity: 2500,
    harvestDate: '2026-11-10',
    description: 'Even-sized, unwashed natural potatoes directly from Agra fields. Perfect for frying and curries.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 103,
      name: 'Manoj Yadav',
      farmName: 'Brajbhumi Kisan Trust',
      location: 'Agra, Uttar Pradesh',
      rating: 4.7,
      reviewsCount: 52,
      verified: true,
      phone: '+91 97190 12345'
    },
    badge: 'Direct Farm'
  },
  {
    id: 4,
    name: 'Snowball Cauliflower',
    hindiName: 'फूलगोभी',
    category: 'vegetables',
    price: 30,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 320,
    harvestDate: '2026-11-19',
    description: 'Crisp white florets harvested at sunrise. Free from synthetic growth stimulants.',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 104,
      name: 'Balwinder Singh',
      farmName: 'Green Valley Organics',
      location: 'Karnal, Haryana',
      rating: 4.8,
      reviewsCount: 29,
      verified: true,
      phone: '+91 98120 77889'
    },
    badge: 'Morning Pluck'
  },
  {
    id: 5,
    name: 'Green Field Cabbage',
    hindiName: 'पत्तागोभी',
    category: 'vegetables',
    price: 22,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 600,
    harvestDate: '2026-11-17',
    description: 'Dense, tightly packed green cabbage heads with sweet, crunchy inner leaves.',
    image: 'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 104,
      name: 'Balwinder Singh',
      farmName: 'Green Valley Organics',
      location: 'Karnal, Haryana',
      rating: 4.8,
      reviewsCount: 29,
      verified: true,
      phone: '+91 98120 77889'
    },
    badge: 'Fresh Harvest'
  },
  {
    id: 6,
    name: 'Pusa Kesar Red Carrot',
    hindiName: 'गाजर',
    category: 'vegetables',
    price: 35,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 400,
    harvestDate: '2026-11-19',
    description: 'Sweet winter red carrots, rich in beta-carotene. Washed with clean tube-well water.',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 105,
      name: 'Gurpreet Kaur',
      farmName: 'Kaur Agro Farms',
      location: 'Ludhiana, Punjab',
      rating: 4.9,
      reviewsCount: 41,
      verified: true,
      phone: '+91 98765 43210'
    },
    badge: 'Winter Special'
  },
  {
    id: 7,
    name: 'Organic Palak (Spinach)',
    hindiName: 'पालक',
    category: 'vegetables',
    price: 28,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 180,
    harvestDate: '2026-11-20',
    description: 'Tender broad green leaves, packed with natural iron. Grown without synthetic pesticides.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 101,
      name: 'Ramesh Patel',
      farmName: 'Patel Organic Farms',
      location: 'Nashik, Maharashtra',
      rating: 4.8,
      reviewsCount: 38,
      verified: true,
      phone: '+91 98231 45678'
    },
    badge: 'Organic Certified'
  },
  {
    id: 8,
    name: 'Crispy Salad Cucumber',
    hindiName: 'खीरा',
    category: 'vegetables',
    price: 26,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 350,
    harvestDate: '2026-11-19',
    description: 'Seedless polyhouse green cucumbers. Refreshing, crisp texture with high water content.',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 106,
      name: 'Vijay Deshmukh',
      farmName: 'Deshmukh Polyhouse',
      location: 'Pune, Maharashtra',
      rating: 4.6,
      reviewsCount: 22,
      verified: true,
      phone: '+91 94235 67890'
    },
    badge: 'Polyhouse'
  },
  {
    id: 9,
    name: 'Green Bell Pepper (Capsicum)',
    hindiName: 'शिमला मिर्च',
    category: 'vegetables',
    price: 48,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 280,
    harvestDate: '2026-11-18',
    description: 'Grade-A dark green shiny capsicums. Thick flesh and great aroma for culinary uses.',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 106,
      name: 'Vijay Deshmukh',
      farmName: 'Deshmukh Polyhouse',
      location: 'Pune, Maharashtra',
      rating: 4.6,
      reviewsCount: 22,
      verified: true,
      phone: '+91 94235 67890'
    },
    badge: 'Premium Grade'
  },
  {
    id: 10,
    name: 'G4 Spicy Green Chilli',
    hindiName: 'हरी मिर्च',
    category: 'vegetables',
    price: 55,
    unit: 'kg',
    minOrder: 2,
    availableQuantity: 150,
    harvestDate: '2026-11-20',
    description: 'Pungent, vibrant green chillies with sharp spice level. Freshly plucked.',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 107,
      name: 'Anand Reddy',
      farmName: 'Kaveri Agro Fields',
      location: 'Guntur, Andhra Pradesh',
      rating: 4.9,
      reviewsCount: 71,
      verified: true,
      phone: '+91 98480 33445'
    },
    badge: 'Extra Hot'
  },
  {
    id: 11,
    name: 'Tender Okra / Bhindi',
    hindiName: 'भिंडी',
    category: 'vegetables',
    price: 42,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 220,
    harvestDate: '2026-11-19',
    description: 'Tender small green lady fingers. Easily snap at tips, indicating supreme freshness.',
    image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 101,
      name: 'Ramesh Patel',
      farmName: 'Patel Organic Farms',
      location: 'Nashik, Maharashtra',
      rating: 4.8,
      reviewsCount: 38,
      verified: true,
      phone: '+91 98231 45678'
    },
    badge: 'Morning Pluck'
  },
  {
    id: 12,
    name: 'Farm Fresh Green Peas (Matar)',
    hindiName: 'मटर',
    category: 'vegetables',
    price: 60,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 310,
    harvestDate: '2026-11-19',
    description: 'Sweet, full-pod winter green peas. Plump kernels bursting with natural sweetness.',
    image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 105,
      name: 'Gurpreet Kaur',
      farmName: 'Kaur Agro Farms',
      location: 'Ludhiana, Punjab',
      rating: 4.9,
      reviewsCount: 41,
      verified: true,
      phone: '+91 98765 43210'
    },
    badge: 'Winter Special'
  },
  {
    id: 13,
    name: 'Desi Garlic Bulbs',
    hindiName: 'लहसुन',
    category: 'vegetables',
    price: 180,
    unit: 'kg',
    minOrder: 2,
    availableQuantity: 500,
    harvestDate: '2026-11-05',
    description: 'Sun-dried desi garlic with strong pungent aroma and high medicinal allicin content.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 108,
      name: 'Radheshyam Sharma',
      farmName: 'Malwa Agro',
      location: 'Mandsaur, Madhya Pradesh',
      rating: 4.9,
      reviewsCount: 88,
      verified: true,
      phone: '+91 99812 65432'
    },
    badge: 'High Quality'
  },
  {
    id: 14,
    name: 'Fresh Rhizome Ginger',
    hindiName: 'अदरक',
    category: 'vegetables',
    price: 110,
    unit: 'kg',
    minOrder: 2,
    availableQuantity: 280,
    harvestDate: '2026-11-12',
    description: 'Fiber-rich spicy ginger harvested directly from shaded loam soil.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 108,
      name: 'Radheshyam Sharma',
      farmName: 'Malwa Agro',
      location: 'Mandsaur, Madhya Pradesh',
      rating: 4.9,
      reviewsCount: 88,
      verified: true,
      phone: '+91 99812 65432'
    },
    badge: 'Direct Farm'
  },
  {
    id: 15,
    name: 'Shimla Royal Delicious Apple',
    hindiName: 'सेब',
    category: 'fruits',
    price: 140,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 800,
    harvestDate: '2026-10-28',
    description: 'Crisp, aromatic high-altitude red apples from Kotgarh orchards. Naturally sweet and juicy.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 109,
      name: 'Devender Negi',
      farmName: 'Himalayan Orchard Crest',
      location: 'Shimla, Himachal Pradesh',
      rating: 5.0,
      reviewsCount: 94,
      verified: true,
      phone: '+91 98160 55667'
    },
    badge: 'Orchard Direct'
  },
  {
    id: 16,
    name: 'Ratnagiri Alphonso Mango (Pre-order / Pulp)',
    hindiName: 'हापुस आम',
    category: 'fruits',
    price: 350,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 200,
    harvestDate: '2026-11-01',
    description: 'GI-tagged authentic coastal Ratnagiri king of mangoes. Unmatched aroma and golden pulp.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 110,
      name: 'Anant Kelkar',
      farmName: 'Konkan Mango Groves',
      location: 'Ratnagiri, Maharashtra',
      rating: 4.9,
      reviewsCount: 115,
      verified: true,
      phone: '+91 94224 88990'
    },
    badge: 'GI Tagged'
  },
  {
    id: 17,
    name: 'Nagpur Mandarin Oranges',
    hindiName: 'संतरा',
    category: 'fruits',
    price: 65,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 950,
    harvestDate: '2026-11-16',
    description: 'Juicy, easy-to-peel sweet Nagpur oranges directly from Vidarbha orchards.',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 111,
      name: 'Prabhakarrao Joshi',
      farmName: 'Vidarbha Citrus Co.',
      location: 'Nagpur, Maharashtra',
      rating: 4.8,
      reviewsCount: 46,
      verified: true,
      phone: '+91 98222 11223'
    },
    badge: 'Juicy & Sweet'
  },
  {
    id: 18,
    name: 'Traditional Basmati Paddy / Rice',
    hindiName: 'बासमती चावल',
    category: 'grains',
    price: 92,
    unit: 'kg',
    minOrder: 25,
    availableQuantity: 3000,
    harvestDate: '2026-11-02',
    description: 'Aged 1121 extra-long grain fragrant basmati rice from irrigated fields of Karnal.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 104,
      name: 'Balwinder Singh',
      farmName: 'Green Valley Organics',
      location: 'Karnal, Haryana',
      rating: 4.8,
      reviewsCount: 29,
      verified: true,
      phone: '+91 98120 77889'
    },
    badge: 'Aged Grain'
  },
  {
    id: 19,
    name: 'Organic Unpolished Toor Dal',
    hindiName: 'अरहर दाल',
    category: 'pulses',
    price: 145,
    unit: 'kg',
    minOrder: 10,
    availableQuantity: 750,
    harvestDate: '2026-10-25',
    description: 'Pure Desi pigeon pea pulse without oil polish or chemical coatings. Cooks quickly with rich broth.',
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 107,
      name: 'Anand Reddy',
      farmName: 'Kaveri Agro Fields',
      location: 'Guntur, Andhra Pradesh',
      rating: 4.9,
      reviewsCount: 71,
      verified: true,
      phone: '+91 98480 33445'
    },
    badge: 'Unpolished'
  },
  {
    id: 20,
    name: 'Salem Pure Haldi (Turmeric) Fingers',
    hindiName: 'हल्दी',
    category: 'spices',
    price: 190,
    unit: 'kg',
    minOrder: 5,
    availableQuantity: 420,
    harvestDate: '2026-10-15',
    description: 'High curcumin (4.5%+) natural yellow turmeric fingers. Sun-dried under hygienic conditions.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    farmer: {
      id: 112,
      name: 'Muthuswamy K.',
      farmName: 'Salem Spice Growers',
      location: 'Salem, Tamil Nadu',
      rating: 4.9,
      reviewsCount: 57,
      verified: true,
      phone: '+91 94432 11998'
    },
    badge: 'High Curcumin'
  }
];

export const DEMO_FARMER = {
  id: 101,
  name: 'Ramesh Patel',
  role: 'farmer',
  email: 'ramesh.farmer@annmitra.org',
  farmName: 'Patel Organic Farms',
  location: 'Nashik, Maharashtra',
  phone: '+91 98231 45678',
  stats: {
    activeListings: 8,
    totalOrders: 28,
    pendingOrders: 3,
    acceptedOrders: 19,
    completedOrders: 5,
    totalEarnings: 78500
  },
  incomingOrders: [
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
    }
  ]
};

export const DEMO_BUYER = {
  id: 201,
  name: 'Addya Singh',
  role: 'buyer',
  email: 'addya.singh@annmitra.org',
  buyerType: 'Retail Business / Cooperative',
  location: 'Mumbai, Maharashtra',
  phone: '+91 98765 00112',
  stats: {
    totalOrders: 14,
    activeOrders: 2,
    completedOrders: 11,
    savedAddresses: 2
  },
  orders: [
    {
      orderId: 'ORD-2026-901',
      cropName: 'Nashik Red Onion',
      farmerName: 'Suresh Gaikwad',
      quantity: '100 kg',
      totalAmount: 3200,
      placedAt: '21 Nov 2026',
      status: 'Dispatched',
      trackingStep: 3, // 1: Placed, 2: Accepted, 3: Dispatched, 4: Delivered
      estimatedDelivery: 'Tomorrow, 22 Nov'
    },
    {
      orderId: 'ORD-2026-880',
      cropName: 'Shimla Royal Delicious Apple',
      farmerName: 'Devender Negi',
      quantity: '20 kg',
      totalAmount: 2800,
      placedAt: '19 Nov 2026',
      status: 'Delivered',
      trackingStep: 4,
      deliveryDate: '20 Nov 2026'
    },
    {
      orderId: 'ORD-2026-855',
      cropName: 'Snowball Cauliflower',
      farmerName: 'Balwinder Singh',
      quantity: '25 kg',
      totalAmount: 750,
      placedAt: '14 Nov 2026',
      status: 'Delivered',
      trackingStep: 4,
      deliveryDate: '15 Nov 2026'
    }
  ]
};

export const PRICE_SUGGESTIONS = [
  {
    crop: 'Tomato (Hybrid)',
    marketAverage: '₹22 - ₹26 / kg',
    recommended: '₹24 / kg',
    trend: 'Rising (+8%)',
    explanation: 'Seasonal demand increase in nearby Mumbai-Pune mandis with reduced supply from southern belts.'
  },
  {
    crop: 'Nashik Red Onion',
    marketAverage: '₹30 - ₹34 / kg',
    recommended: '₹32 / kg',
    trend: 'Stable',
    explanation: 'Steady arrivals at Lasalgaon. Storage stock levels remain moderate across western hubs.'
  },
  {
    crop: 'Green Chilli (G4)',
    marketAverage: '₹50 - ₹58 / kg',
    recommended: '₹55 / kg',
    trend: 'High Demand',
    explanation: 'Strong export and processing demand across Andhra Pradesh mandis.'
  }
];
