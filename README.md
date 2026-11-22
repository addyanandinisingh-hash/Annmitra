# Annmitra (अन्नमित्र) 🌾
> **Farmer Direct Market Access Platform**  
> *खेत से सीधा आपकी थाली तक • Direct from Farmers, Fair for Everyone*

Annmitra is a digital agricultural marketplace that connects farmers directly with retail consumers, local stores, and bulk buyers—eliminating predatory middlemen commissions, bringing transparency through explainable crop-price suggestions, and preserving full transactional integrity via an academic **Fourth Normal Form (4NF)** relational database.

---

## 🚀 Quick Start (View in VS Code & Chrome)

To run the development server:

```bash
# Navigate to the repository
cd ~/AntigravityProjects/Annmitra

# Start the Vite development server
npm run dev
```

Alternatively, you can run directly inside the frontend folder:
```bash
cd ~/AntigravityProjects/Annmitra/frontend
npm run dev
```

Then open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🌟 Implemented Features

### 1. Modern Agriculture-Inspired Design System
- High-contrast green-and-white theme (`#15803d`, `#166534`, `#f0fdf4`) with warm amber accents.
- Responsive typography using **Plus Jakarta Sans** and **Outfit**.
- Full mobile, tablet, and desktop layout responsiveness.

### 2. Comprehensive Agricultural Marketplace
- **20+ Realistic Crops** across 5 distinct categories:
  - 🥦 **Fresh Vegetables:** Desi Hybrid Tomato, Nashik Red Onion, Agra Potato, Snowball Cauliflower, Cabbage, Red Carrot, Palak, Cucumber, Capsicum, Green Chilli, Bhindi, Matar, Garlic, Ginger.
  - 🍎 **Orchard Fruits:** Shimla Royal Delicious Apple, Ratnagiri Alphonso Mango, Nagpur Oranges.
  - 🌾 **Grains & Cereals:** Traditional Basmati Rice.
  - 🫘 **Pulses & Dal:** Organic Unpolished Toor Dal.
  - 🌶️ **Farm Spices:** Salem Pure Haldi Fingers.
- Multi-facet live filtering by:
  - Category pill tabs
  - Instant text search (English & Hindi crop names, farmer names, locations)
  - Mandi / Region filter (Nashik, Pune, Karnal, Ludhiana, Agra, Guntur, Shimla, etc.)
  - Price brackets (Under ₹30, ₹30-₹60, ₹60-₹150, Above ₹150)
  - Dynamic sorting (Price Low-High, Price High-Low, Rating, Stock)

### 3. Interactive Kisan (Farmer) Portal & Dashboard
- Stat Cards: Active Listings, Total Orders Received, Pending Orders, Accepted Orders, Total Sales.
- **Incoming Orders Management:** Interactive **Accept** and **Reject** controls that update status in real time.
- **Add New Crop Listing Form:** Interactive modal to create crop listings with name, Hindi translation, category, unit (kg, quintal, crate), price, and available stock.
- **Python Price Intelligence Preview:** Displays market averages, recommended fair prices, and explainable economic trends.

### 4. Interactive Buyer Portal & Dashboard
- Stat Cards: Total Orders, Active Dispatches, Completed Purchases, Saved Addresses.
- **Live Order Tracking Progress Bar:** Visual 4-step order lifecycle (`Placed` $\to$ `Accepted` $\to$ `Dispatched` $\to$ `Delivered`).
- **Complete Purchase History Table:** Full audit record with a functional review submission modal.

### 5. Authentication UI & Google OAuth Ready
- Dedicated role switchers: Farmer vs. Buyer login.
- **Google OAuth 2.0 Integration Button** with backend `.env` configuration readiness.
- **One-Click Demo Login** buttons (`Log in as Demo Farmer` / `Log in as Demo Buyer`) for instant evaluation.

---

## 📂 Project Architecture

```
Annmitra/
├── frontend/                     # React.js SPA (Vite + React 18)
│   ├── public/                   # Static icons and assets
│   ├── src/
│   │   ├── assets/               # SVGs and styling assets
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx        # Responsive navigation with role switcher
│   │   │   ├── Footer.jsx        # Platform footer and kisan helpline
│   │   │   ├── Hero.jsx          # Hero search banner
│   │   │   ├── CropCard.jsx      # Agricultural product card
│   │   │   ├── CropDetailModal.jsx # Direct ordering modal
│   │   │   └── AuthModal.jsx     # Google OAuth & role-based sign-in
│   │   ├── data/
│   │   │   └── mockData.js       # Realistic agricultural dataset
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Marketplace.jsx   # Filterable vegetable marketplace
│   │   │   ├── About.jsx         # Architecture & 4NF evaluation
│   │   │   ├── FarmerDashboard.jsx # Kisan management portal
│   │   │   └── BuyerDashboard.jsx  # Consumer tracking dashboard
│   │   ├── styles/
│   │   │   └── index.css         # Agriculture design system
│   │   ├── App.jsx               # Application root & router
│   │   └── main.jsx              # React DOM entrypoint
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore                    # Secrets & node_modules exclusion
├── package.json                  # Root convenience scripts
└── README.md                     # Project documentation
```

---

## 🎓 Academic Evaluation Notes
- **Repository:** `https://github.com/addyanandinisingh-hash/Annmitra`
- **Database Normalization:** Complies with **Fourth Normal Form (4NF)** across 17 decomposed relational entities.
- **Branch:** `main` (No premature pushes without explicit approval).

## Local Development

This project uses React and Vite for the frontend.

To start the frontend locally:

1. Navigate to the frontend directory.
2. Run `npm install`.
3. Run `npm run dev`.
