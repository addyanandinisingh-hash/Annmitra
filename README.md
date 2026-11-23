# Annmitra (अन्नमित्र) 🌾
### Farmer Direct Market Access Platform

*खेत से सीधा आपकी थाली तक • Direct from Farmers, Fair for Everyone*

Annmitra is a platform built to help farmers sell their crops directly to consumers, local shops, and bulk buyers.

The main idea behind this project is to make selling and buying agricultural products easier and more transparent. Farmers can list their crops, set their own prices, and receive orders directly from buyers without depending heavily on middlemen.

The platform also includes a crop price suggestion feature that helps farmers understand what a fair selling price could be. We have designed the database using **Fourth Normal Form (4NF)** to keep the data organised and reduce unnecessary duplication.

---

## 🚀 How to Run the Project

You can run Annmitra locally using VS Code and open it in Chrome.

First, open the project folder in your terminal:

```bash
cd ~/AntigravityProjects/Annmitra
```

Install the dependencies if you haven't already:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

You can also start the frontend directly:

```bash
cd ~/AntigravityProjects/Annmitra/frontend
npm install
npm run dev
```

Once the server starts, open the following link in your browser:

**http://localhost:5173**

---

## 🌟 Features

### 1. Simple and Responsive Design

We have designed the website with a clean green-and-white theme inspired by agriculture.

- Green and white colour scheme with warm amber accents.
- Fonts used: Plus Jakarta Sans and Outfit.
- Responsive layout for mobile phones, tablets, and desktops.
- Easy navigation for both farmers and buyers.

### 2. Agricultural Marketplace

The marketplace contains more than 20 crop listings across different categories.

Some of the available crops include:

- **Vegetables:** Tomato, onion, potato, cauliflower, cabbage, carrot, spinach, cucumber, capsicum, chilli, bhindi, peas, garlic, and ginger.
- **Fruits:** Apples, Alphonso mangoes, and Nagpur oranges.
- **Grains:** Traditional Basmati rice.
- **Pulses:** Organic unpolished Toor Dal.
- **Spices:** Salem turmeric fingers.

Buyers can find crops using different filters:

- Search by crop name, Hindi name, farmer name, or location.
- Filter crops by category.
- Select a mandi or region such as Nashik, Pune, Agra, Karnal, or Shimla.
- Filter products according to price.
- Sort products by price, rating, or available stock.

This makes it easier for buyers to find the products they need.

### 3. Farmer Dashboard

The farmer dashboard helps farmers manage their products and orders in one place.

Farmers can:

- View their active crop listings.
- Check the total number of orders received.
- See pending and accepted orders.
- Track their total sales.
- Accept or reject incoming orders.
- Add new crops with details such as name, Hindi name, category, unit, price, and available stock.

The dashboard also includes a price suggestion section connected to our Python-based price intelligence service. It shows market averages, suggested prices, and the factors behind the recommendation.

### 4. Buyer Dashboard

The buyer dashboard allows customers to manage their orders and view their purchase history.

It includes:

- Total orders placed.
- Orders currently being delivered.
- Completed purchases.
- Saved addresses.

Buyers can also track their orders through four stages:

**Placed → Accepted → Dispatched → Delivered**

The purchase history keeps a record of previous orders, and buyers can submit reviews for products they have purchased.

### 5. Login and Authentication

The website has separate login options for farmers and buyers.

We have also included:

- Google login button with OAuth 2.0 configuration support.
- Demo login for farmers.
- Demo login for buyers.

The demo login option makes it easier to explore the website during project evaluation without creating a new account.

---

## 📂 Project Structure

The project is divided into different components and folders to make the code easier to manage.

```text
Annmitra/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CropCard.jsx
│   │   │   ├── CropDetailModal.jsx
│   │   │   └── AuthModal.jsx
│   │   │
│   │   ├── data/
│   │   │   └── mockData.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── About.jsx
│   │   │   ├── FarmerDashboard.jsx
│   │   │   └── BuyerDashboard.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md
```

### Technologies Used

- **Frontend:** React.js, Vite, HTML, CSS, JavaScript
- **Backend:** Node.js and Express
- **Database:** Relational database designed using 4NF principles
- **Price Intelligence:** Python
- **Authentication:** Google OAuth 2.0

---

## 🎓 Project Details

**Project Name:** Annmitra (अन्नमित्र)

**Project Type:** Farmer Direct Market Access Platform

**GitHub Repository:**  
https://github.com/addyanandinisingh-hash/Annmitra

**Branch:** `main`

### Database Design

One of the important parts of this project is the database design.

We have organised the database into **17 relational entities** and followed Fourth Normal Form (4NF) principles. The purpose is to keep different types of information separate, avoid unnecessary duplication, and maintain consistency between farmers, buyers, crops, orders, and other records.

The database structure is also part of our academic evaluation, so we have focused on making it properly organised and easy to explain.

---

## Local Development

Annmitra is built using React and Vite for the frontend.

To run the project:

1. Clone or download the repository.
2. Open the project in VS Code.
3. Go to the frontend folder.
4. Install the required packages using `npm install`.
5. Start the server using `npm run dev`.
6. Open the local URL shown in the terminal.

The project is currently being developed and tested locally.

Our goal with Annmitra is to make it easier for farmers to reach buyers directly while giving buyers a simple and transparent way to purchase fresh agricultural products.
