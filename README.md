# 🥒 Naani Pickles™ (नानी के आचार) — Premium E-Commerce & Admin Platform

> *"Dhoop, Dhaga, aur Dulaar"* — Sun-cured in clay barnis, pounded on basalt stone sil-batta, made with 60-year-old heirloom family recipes from 1964. Zero preservatives, zero synthetic vinegar.

---

## 🌟 Brand & Website Overview

**Naani Pickles™** is a luxury Indian e-commerce platform with an integrated **Administration & Kitchen Management Panel**, **Customer User Accounts with Buying History & Live Order Tracking**, and **Razorpay Payment Gateway Integration**.

---

## 🛡️ Administration & Backend Panel (`src/admin/`)

The Administration Panel gives full control over the storefront without touching code:

### 1. How to Access Admin Panel
- **Navbar Button**: Click **"Admin Panel"** in the top navigation bar or mobile drawer.
- **Master Admin Credentials**:
  - **Email**: `admin@naanipickles.com`
  - **Password**: `admin123`

### 2. Admin Capabilities:
- **Product Catalog Manager (Live Frontend Editor)**:
  - Add new pickles with photo URLs, English & Hindi names, category, description, ingredients, spice meter, oil base, and jar prices (250g, 500g, 1kg).
  - Edit any existing product details in real-time. Changes instantly reflect on the customer storefront.
  - Quick toggle for `In Stock` / `Out of Stock`.
  - Delete / archive products.
- **Customer Orders & Fulfillment**:
  - View all incoming customer orders.
  - Update fulfillment stages: *Order Placed* ➔ *Packing in Muslin Cloth* ➔ *Dispatched* ➔ *In Transit* ➔ *Out for Delivery* ➔ *Delivered*.
  - Assign / edit Courier Tracking Numbers (e.g. `BLUEDART-NP60950-IN`).
- **Razorpay Payment Gateway Configuration**:
  - Enter your **Razorpay Key ID** (`rzp_test_...` or `rzp_live_...`) & **Razorpay Key Secret**.
  - Toggle Razorpay Gateway On/Off.
  - Switch between **Test Sandbox** and **Live Production** modes.
  - Custom display name on Razorpay checkout popup.
- **Kitchen Analytics**:
  - Real-time Revenue (₹), Total Jars Shipped, and Active Orders.

---

## 👤 Customer Portal & Buying History (`src/user/`)

- **Sign In / Registration**: Customers can register and sign in to their personal account.
- **Demo Customer Account**:
  - **Email**: `akhlaqueahmad12345@gmail.com`
  - **Password**: `password123`
- **Buying History (My Orders)**:
  - View itemized receipts and purchase dates for past orders.
  - **Interactive 5-Stage Live Order Tracking**:
    - 1. Order Placed
    - 2. Packing in Muslin Cloth & Sealing
    - 3. Dispatched & In Transit
    - 4. Out for Delivery
    - 5. Delivered
  - Courier AWB and estimated arrival date.
  - 1-Click **"Re-Order"** button.
- **Quick Order Tracker**: Guests can track any order by typing their Order ID (e.g. `NP-60950`) or AWB directly from the header without signing in.

---

## 💳 Razorpay Payment Gateway Integration

Customers can pay via:
- **Razorpay Secure Checkout**: Instant UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Netbanking (58+ banks), and Wallets.
- **UPI Direct QR**
- **Cash on Delivery (COD)**

---

## 🛠️ Code Structure

```
d:\housekepping data\
├── public\
│   └── logo.png              # Official Naani Pickles "Swaad hi Pehchan" logo
├── src\
│   ├── admin\
│   │   ├── AdminPortal.jsx   # Complete Admin Dashboard, Product CRUD, Razorpay & Orders
│   │   └── AdminLoginModal.jsx # Secure Admin Login
│   ├── user\
│   │   ├── UserAuthModal.jsx    # Customer Sign In & Registration
│   │   ├── UserAccountModal.jsx # Customer Account, Buying History & Order Tracking
│   │   └── OrderTrackerModal.jsx# Quick Guest Order Lookup
│   ├── components\
│   │   ├── Navbar.jsx        # Navigation with logo, Track Order & My Account buttons
│   │   ├── CheckoutModal.jsx # Multi-step checkout with Razorpay integration
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── data\
│   │   └── products.js       # Fallback catalog & categories
│   └── App.jsx               # Orchestrates dynamic API sync, cart, and modals
├── server\
│   ├── index.js              # REST API (Products CRUD, Admin, Razorpay, User Auth, Orders)
│   └── naani_data.json       # Persistent database file
└── run.bat                   # 1-Click launcher
```

---

## 🏃 Launch the Website

Open your browser to: **[http://localhost:5000](http://localhost:5000)**  
(or run `run.bat` / `start.bat`)
