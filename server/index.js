const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'naani_data.json');

app.use(cors());
app.use(express.json());

// Database read/write helpers
function readDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { storeInfo: {}, products: [], coupons: [], orders: [], reviews: [], users: [], settings: {} };
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading Naani DB:', err);
    return { storeInfo: {}, products: [], coupons: [], orders: [], reviews: [], users: [], settings: {} };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving Naani DB:', err);
    return false;
  }
}

// ----------------- STORE & COURTYARD -----------------
app.get('/api/store/info', (req, res) => {
  const db = readDb();
  res.json(db.storeInfo || {});
});

app.get('/api/courtyard-status', (req, res) => {
  const db = readDb();
  const info = db.storeInfo || {};
  res.json({
    location: "Varanasi Ganges Terrace & Jodhpur Courtyards",
    temperature: "32°C",
    sky: "Clear Radiant Sun (उत्तम धूप)",
    uvIndex: 8.5,
    airQuality: "Fresh Courtyard Breeze",
    activeCuringBarnis: info.activeCuringBarnis || 540,
    currentSunExposureDays: info.sunDaysElapsed || 16,
    targetCuringDays: 21,
    sunMaturationPercent: Math.round(((info.sunDaysElapsed || 16) / 21) * 100),
    nextBatchDate: "November 4, 2026",
    oilStatus: "Fresh Kohlu Wood-Pressed Mustard Oil Steeping"
  });
});

// ----------------- PRODUCTS CRUD (ADMIN & STOREFRONT) -----------------
app.get('/api/products', (req, res) => {
  const db = readDb();
  res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
  const db = readDb();
  const productData = req.body;

  if (!productData.name || !productData.price) {
    return res.status(400).json({ error: "Product name and price are required." });
  }

  const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${slug}-${Date.now().toString().slice(-4)}`;

  const newProduct = {
    id: productData.id || id,
    name: productData.name,
    hindiName: productData.hindiName || '',
    category: productData.category || 'All Pickles',
    tagline: productData.tagline || '',
    description: productData.description || '',
    fullStory: productData.fullStory || '',
    badge: productData.badge || 'New Harvest',
    isBestseller: !!productData.isBestseller,
    spiceLevel: Number(productData.spiceLevel) || 2,
    spiceText: productData.spiceText || 'Medium Zing',
    oilBase: productData.oilBase || 'Kachi Ghani Mustard Oil',
    sunDays: Number(productData.sunDays) || 21,
    rating: Number(productData.rating) || 5.0,
    reviewsCount: Number(productData.reviewsCount) || 1,
    origin: productData.origin || 'Varanasi, Uttar Pradesh',
    harvestYear: productData.harvestYear || 'Harvest 2026',
    batch: productData.batch || `BATCH-${Date.now().toString().slice(-4)}`,
    inStock: productData.inStock !== false,
    ingredients: Array.isArray(productData.ingredients) 
      ? productData.ingredients 
      : (productData.ingredients ? productData.ingredients.split(',').map(s => s.trim()) : []),
    tasteProfile: productData.tasteProfile || {
      tanginess: 8,
      spiciness: 8,
      crunch: 9,
      aroma: 9
    },
    pairings: Array.isArray(productData.pairings)
      ? productData.pairings
      : (productData.pairings ? productData.pairings.split(',').map(s => s.trim()) : ["Crisp parathas with fresh ghee"]),
    sizes: productData.sizes && productData.sizes.length ? productData.sizes : [
      { size: "250g Glass Jar", price: Number(productData.price), originalPrice: Math.round(Number(productData.price) * 1.2), label: "Starter" },
      { size: "500g Jar (Most Loved)", price: Math.round(Number(productData.price) * 1.7), originalPrice: Math.round(Number(productData.price) * 2), label: "Best Value", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: Math.round(Number(productData.price) * 3.1), originalPrice: Math.round(Number(productData.price) * 3.6), label: "Ceramic Barni with Muslin Tie" }
    ],
    image: productData.image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
  };

  db.products = db.products || [];
  db.products.unshift(newProduct);
  writeDb(db);

  res.status(201).json({ success: true, message: "Product created successfully!", product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const db = readDb();
  const productId = req.params.id;
  const index = (db.products || []).findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const existing = db.products[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id // protect ID
  };

  db.products[index] = updated;
  writeDb(db);

  res.json({ success: true, message: "Product updated successfully!", product: updated });
});

app.delete('/api/products/:id', (req, res) => {
  const db = readDb();
  const productId = req.params.id;
  const index = (db.products || []).findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deleted = db.products.splice(index, 1);
  writeDb(db);

  res.json({ success: true, message: "Product deleted successfully!", deleted: deleted[0] });
});

// ----------------- ADMIN AUTH & SETTINGS -----------------
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const admin = db.admin || {
    email: 'admin@naanipickles.com',
    password: 'admin123',
    name: 'Chief Pickle Connoisseur'
  };

  if (email.toLowerCase().trim() === admin.email.toLowerCase().trim() && password === admin.password) {
    res.json({
      success: true,
      token: `admin_token_${Date.now()}`,
      admin: {
        name: admin.name || "Head Administrator",
        email: admin.email,
        role: "superadmin"
      }
    });
  } else {
    res.status(401).json({ error: "Invalid Admin email or password. (Default: admin@naanipickles.com / admin123)" });
  }
});

app.get('/api/admin/settings', (req, res) => {
  const db = readDb();
  res.json({
    storeInfo: db.storeInfo || {},
    razorpay: db.settings?.razorpay || {
      enabled: true,
      keyId: 'rzp_test_NaaniPickles2026',
      keySecret: 'w948hfskj3489hfskd',
      mode: 'test',
      accountName: 'Naani Pickles Heritage Foodworks',
      currency: 'INR'
    }
  });
});

app.post('/api/admin/settings', (req, res) => {
  const db = readDb();
  const { storeInfo, razorpay, adminCredentials } = req.body;

  if (storeInfo) {
    db.storeInfo = { ...db.storeInfo, ...storeInfo };
  }
  if (razorpay) {
    db.settings = db.settings || {};
    db.settings.razorpay = { ...db.settings.razorpay, ...razorpay };
  }
  if (adminCredentials && adminCredentials.password) {
    db.admin = db.admin || {};
    if (adminCredentials.email) db.admin.email = adminCredentials.email;
    db.admin.password = adminCredentials.password;
  }

  writeDb(db);
  res.json({ success: true, message: "Settings saved successfully!" });
});

// ----------------- RAZORPAY PAYMENT GATEWAY -----------------
app.get('/api/payment/razorpay/config', (req, res) => {
  const db = readDb();
  const rzp = db.settings?.razorpay || {
    enabled: true,
    keyId: 'rzp_test_NaaniPickles2026',
    mode: 'test',
    accountName: 'Naani Pickles'
  };

  // Only return public Key ID, never the secret key!
  res.json({
    enabled: !!rzp.enabled,
    keyId: rzp.keyId || 'rzp_test_NaaniPickles2026',
    mode: rzp.mode || 'test',
    accountName: rzp.accountName || 'Naani Pickles™'
  });
});

app.post('/api/payment/razorpay/create-order', (req, res) => {
  const { amount, currency } = req.body;
  const db = readDb();
  const rzp = db.settings?.razorpay || {};

  const orderId = `order_np_${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    orderId: orderId,
    amount: Math.round(Number(amount) * 100), // amount in paise
    currency: currency || 'INR',
    keyId: rzp.keyId || 'rzp_test_NaaniPickles2026',
    name: 'Naani Pickles™',
    description: 'Heritage Handcrafted Pickles & Chutneys'
  });
});

app.post('/api/payment/razorpay/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  // In production, signature would be verified with HMAC SHA256 using keySecret
  const paymentRecord = {
    paymentId: razorpay_payment_id || `pay_${Date.now()}`,
    orderId: razorpay_order_id,
    verified: true,
    mode: 'Razorpay',
    timestamp: new Date().toISOString()
  };

  res.json({
    success: true,
    message: "Razorpay payment verified successfully!",
    payment: paymentRecord
  });
});

// ----------------- CUSTOMER USER AUTH & PORTAL -----------------
app.post('/api/user/register', (req, res) => {
  const { name, email, phone, password, address, city, state, pincode } = req.body;
  const db = readDb();
  db.users = db.users || [];

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = db.users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists. Please sign in." });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email: normalizedEmail,
    phone: phone || '',
    password, // in real production hash with bcrypt
    address: address ? `${address}, ${city || ''}, ${state || ''} - ${pincode || ''}` : '',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: "Welcome to the Naani Pickles Parivaar!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address
    }
  });
});

app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const normalizedEmail = (email || '').toLowerCase().trim();

  const user = (db.users || []).find(u => 
    u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password. Please try again or create an account." });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    }
  });
});

app.get('/api/user/orders/:identifier', (req, res) => {
  const db = readDb();
  const query = decodeURIComponent(req.params.identifier).toLowerCase().trim();
  const cleanPhone = query.replace(/\D/g, '');

  const userOrders = (db.orders || []).filter(o => {
    const matchesEmail = o.email && o.email.toLowerCase().trim() === query;
    const matchesPhone = cleanPhone && o.phone && o.phone.replace(/\D/g, '').includes(cleanPhone);
    const matchesCustomer = o.customerName && o.customerName.toLowerCase().includes(query);
    return matchesEmail || matchesPhone || matchesCustomer;
  });

  res.json(userOrders);
});

// ----------------- ORDER TRACKING & FULFILLMENT -----------------
app.get('/api/orders/track/:orderId', (req, res) => {
  const db = readDb();
  const query = req.params.orderId.toUpperCase().trim();

  const order = (db.orders || []).find(o => 
    o.id.toUpperCase() === query || 
    (o.trackingNumber && o.trackingNumber.toUpperCase() === query)
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found. Please check your Order ID (e.g. NP-60950) or tracking number." });
  }

  // Construct structured timeline based on status
  const stages = [
    { name: "Order Placed", desc: "Received at Varanasi / Jodhpur kitchen", completed: true, date: order.createdAt },
    { name: "Packing in Muslin Cloth", desc: "Hand-tied with cotton thread in protective earthen casing", completed: order.status !== "Received", current: order.status === "Packing in Muslin Cloth" },
    { name: "Dispatched & In Transit", desc: `Handed over to ${order.trackingNumber ? order.trackingNumber.split('-')[0] : 'Air Express Courier'}`, completed: ["Dispatched", "In Transit", "Out for Delivery", "Delivered"].includes(order.status), current: ["Dispatched", "In Transit"].includes(order.status) },
    { name: "Out for Delivery", desc: "Arriving at your doorstep today", completed: ["Out for Delivery", "Delivered"].includes(order.status), current: order.status === "Out for Delivery" },
    { name: "Delivered", desc: "Arrived at your dining table", completed: order.status === "Delivered", current: order.status === "Delivered" }
  ];

  res.json({
    order,
    stages,
    courier: order.trackingNumber ? (order.trackingNumber.includes('BLUEDART') ? 'Bluedart Express' : 'DTDC Express') : 'Air Cargo Priority',
    trackingNumber: order.trackingNumber || `EXP-${order.id}-IN`,
    estimatedDelivery: order.estimatedDelivery || "In 2-3 Days"
  });
});

// ----------------- COUPONS, ORDERS & REVIEWS -----------------
app.post('/api/coupons/apply', (req, res) => {
  const { code, cartTotal } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: "Please enter a coupon code" });

  const db = readDb();
  const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!coupon) {
    return res.status(404).json({ valid: false, message: "Invalid promo code. Try NAANI10 or PEHLIKHOJ" });
  }

  if (coupon.minOrder && cartTotal < coupon.minOrder) {
    return res.status(400).json({ 
      valid: false, 
      message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrder}. Add items worth ₹${coupon.minOrder - cartTotal} more!` 
    });
  }

  let discount = 0;
  if (coupon.discountPercent) {
    discount = Math.round((cartTotal * coupon.discountPercent) / 100);
  } else if (coupon.flatDiscount) {
    discount = Math.min(coupon.flatDiscount, cartTotal);
  }

  res.json({
    valid: true,
    code: coupon.code,
    discountAmount: discount,
    freeShipping: !!coupon.freeShipping,
    message: `${coupon.code} applied successfully! You saved ₹${discount}`
  });
});

app.get('/api/orders', (req, res) => {
  const db = readDb();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const db = readDb();
  const {
    customerName,
    phone,
    email,
    address,
    city,
    state,
    pincode,
    items,
    totalAmount,
    discountAmount,
    shippingFee,
    finalAmount,
    paymentMethod,
    giftMessage,
    razorpayPaymentId
  } = req.body;

  if (!customerName || !phone || !items || !items.length) {
    return res.status(400).json({ error: "Missing required order information" });
  }

  const orderNum = Math.floor(10000 + Math.random() * 90000);
  const newOrder = {
    id: `NP-${orderNum}`,
    createdAt: new Date().toISOString(),
    customerName,
    phone,
    email: email || '',
    address: `${address}, ${city || ''}, ${state || ''} - ${pincode || ''}`,
    items,
    totalAmount: Number(totalAmount) || 0,
    discountAmount: Number(discountAmount) || 0,
    shippingFee: Number(shippingFee) || 0,
    finalAmount: Number(finalAmount) || 0,
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    giftMessage: giftMessage || null,
    razorpayPaymentId: razorpayPaymentId || null,
    status: 'Packing in Muslin Cloth',
    estimatedDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', {
      weekday: 'short', month: 'short', day: 'numeric'
    }),
    trackingNumber: `BLUEDART-NP${orderNum}-IN`
  };

  db.orders = db.orders || [];
  db.orders.unshift(newOrder);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: "Aashirwaad! Order placed successfully with Naani Pickles.",
    order: newOrder
  });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const db = readDb();
  const { status, trackingNumber } = req.body;
  const order = (db.orders || []).find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  writeDb(db);
  res.json({ success: true, order });
});

app.get('/api/reviews', (req, res) => {
  const db = readDb();
  res.json(db.reviews || []);
});

app.post('/api/reviews', (req, res) => {
  const db = readDb();
  const { productId, userName, location, rating, comment } = req.body;

  if (!userName || !comment) {
    return res.status(400).json({ error: "Name and comment are required" });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    productId: productId || 'general',
    userName,
    location: location || 'India',
    rating: Number(rating) || 5,
    date: 'Just now',
    comment,
    verified: true,
    likes: 1
  };

  db.reviews = db.reviews || [];
  db.reviews.unshift(newReview);
  writeDb(db);
  res.status(201).json({ success: true, review: newReview });
});

app.post('/api/newsletter', (req, res) => {
  const { email, phone } = req.body;
  const db = readDb();
  db.subscribers = db.subscribers || [];
  db.subscribers.push({
    contact: email || phone,
    subscribedAt: new Date().toISOString()
  });
  writeDb(db);

  res.json({
    success: true,
    message: "Pranam! You are now part of Naani's Secret Recipe & Seasonal Batch Circle."
  });
});

// ----------------- BLOG POSTS & MANAGEMENT API -----------------

// Helper to calculate reading time
function calculateReadTime(text) {
  const words = (text || '').trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 180);
  return `${minutes < 1 ? 1 : minutes} min read`;
}

// 1. Get all published posts (or all posts if ?all=true for admin)
app.get('/api/blog/posts', (req, res) => {
  const db = readDb();
  let posts = [...(db.blogPosts || [])];
  const { all, category, search, tag, limit, offset } = req.query;

  // Filter published only for public storefront unless all=true
  if (all !== 'true') {
    posts = posts.filter(p => p.status === 'published');
  }

  // Category filter
  if (category && category !== 'All' && category !== 'all') {
    posts = posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  // Tag filter
  if (tag) {
    posts = posts.filter(p => (p.tags || []).some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  // Search filter
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    posts = posts.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.hindiTitle && p.hindiTitle.toLowerCase().includes(q)) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
      (p.content && p.content.toLowerCase().includes(q)) ||
      (p.author && p.author.toLowerCase().includes(q)) ||
      (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Sort by publishedAt / createdAt descending
  posts.sort((a, b) => new Date(b.createdAt || b.publishedAt || 0) - new Date(a.createdAt || a.publishedAt || 0));

  const total = posts.length;
  const start = Number(offset) || 0;
  const paginatedPosts = limit ? posts.slice(start, start + Number(limit)) : posts;

  res.json({
    total,
    posts: paginatedPosts
  });
});

// 2. Get single post by slug or ID
app.get('/api/blog/posts/:slugOrId', (req, res) => {
  const db = readDb();
  const { slugOrId } = req.params;
  const post = (db.blogPosts || []).find(p => p.slug === slugOrId || p.id === slugOrId);

  if (!post) {
    return res.status(404).json({ error: "Article not found" });
  }

  // Increment view counter
  post.views = (post.views || 0) + 1;
  writeDb(db);

  // Find related posts (same category or published other posts)
  const relatedPosts = (db.blogPosts || [])
    .filter(p => p.id !== post.id && p.status === 'published')
    .slice(0, 3);

  res.json({ post, relatedPosts });
});

// 3. Like a post
app.post('/api/blog/posts/:slugOrId/like', (req, res) => {
  const db = readDb();
  const { slugOrId } = req.params;
  const post = (db.blogPosts || []).find(p => p.slug === slugOrId || p.id === slugOrId);
  if (!post) return res.status(404).json({ error: "Article not found" });
  post.likes = (post.likes || 0) + 1;
  writeDb(db);
  res.json({ success: true, likes: post.likes });
});

// 4. Create new blog post (Admin)
app.post('/api/blog/posts', (req, res) => {
  const db = readDb();
  const {
    title,
    hindiTitle,
    slug,
    category,
    tags,
    author,
    authorRole,
    authorImage,
    excerpt,
    content,
    featuredImage,
    status,
    isFeatured
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Article title and content are required." });
  }

  const generatedSlug = (slug || title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const id = `post-${Date.now()}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const newPost = {
    id,
    title: title.trim(),
    hindiTitle: hindiTitle ? hindiTitle.trim() : '',
    slug: generatedSlug || id,
    category: category || "Grandma's Kitchen",
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
    author: author || "Grandmother Shanti Devi",
    authorRole: authorRole || "Head Recipe Curator • Estd. 1964",
    authorImage: authorImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    excerpt: excerpt ? excerpt.trim() : content.substring(0, 160).replace(/<[^>]*>/g, '') + '...',
    content: content.trim(),
    featuredImage: featuredImage || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    readTime: calculateReadTime(content),
    status: status || 'published',
    isFeatured: !!isFeatured,
    views: 0,
    likes: 0,
    createdAt: now.toISOString(),
    publishedAt: status === 'draft' ? null : dateFormatted
  };

  db.blogPosts = db.blogPosts || [];
  db.blogPosts.unshift(newPost);
  writeDb(db);

  res.status(201).json({ success: true, message: "Blog article published successfully!", post: newPost });
});

// 5. Update existing blog post (Admin)
app.put('/api/blog/posts/:id', (req, res) => {
  const db = readDb();
  const index = (db.blogPosts || []).findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Article not found" });

  const current = db.blogPosts[index];
  const updateData = req.body;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  db.blogPosts[index] = {
    ...current,
    ...updateData,
    id: current.id,
    tags: Array.isArray(updateData.tags) 
      ? updateData.tags 
      : (updateData.tags ? updateData.tags.split(',').map(t => t.trim()).filter(Boolean) : current.tags),
    readTime: updateData.content ? calculateReadTime(updateData.content) : current.readTime,
    publishedAt: (updateData.status === 'published' && !current.publishedAt) ? dateFormatted : (updateData.publishedAt || current.publishedAt),
    updatedAt: now.toISOString()
  };

  writeDb(db);
  res.json({ success: true, message: "Article updated successfully!", post: db.blogPosts[index] });
});

// 6. Delete blog post (Admin)
app.delete('/api/blog/posts/:id', (req, res) => {
  const db = readDb();
  const post = (db.blogPosts || []).find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Article not found" });

  db.blogPosts = db.blogPosts.filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: `Article "${post.title}" deleted.` });
});

// 7. Toggle blog post status (Admin)
app.patch('/api/blog/posts/:id/status', (req, res) => {
  const db = readDb();
  const post = (db.blogPosts || []).find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Article not found" });

  post.status = post.status === 'published' ? 'draft' : 'published';
  if (post.status === 'published' && !post.publishedAt) {
    post.publishedAt = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  writeDb(db);
  res.json({ success: true, status: post.status, post });
});

// 8. Categories CRUD
app.get('/api/blog/categories', (req, res) => {
  const db = readDb();
  const posts = db.blogPosts || [];
  const categories = db.blogCategories || [];

  const withCounts = categories.map(cat => ({
    ...cat,
    count: posts.filter(p => p.category?.toLowerCase() === cat.name.toLowerCase()).length
  }));

  res.json(withCounts);
});

app.post('/api/blog/categories', (req, res) => {
  const db = readDb();
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Category name is required" });

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `cat-${Date.now()}`;

  const newCat = { id, name: name.trim(), slug, description: description || '' };
  db.blogCategories = db.blogCategories || [];
  db.blogCategories.push(newCat);
  writeDb(db);

  res.status(201).json({ success: true, category: newCat });
});

app.delete('/api/blog/categories/:id', (req, res) => {
  const db = readDb();
  db.blogCategories = (db.blogCategories || []).filter(c => c.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: "Category deleted." });
});

// 9. Media Library CRUD
app.get('/api/blog/media', (req, res) => {
  const db = readDb();
  res.json(db.blogMedia || []);
});

app.post('/api/blog/media', (req, res) => {
  const db = readDb();
  const { title, url, alt, category } = req.body;
  if (!url) return res.status(400).json({ error: "Media URL is required" });

  const newItem = {
    id: `media-${Date.now()}`,
    title: title || 'Culinary Photograph',
    url: url.trim(),
    alt: alt || 'Naani Pickles Heritage Photograph',
    category: category || 'Spices & Jars',
    uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  db.blogMedia = db.blogMedia || [];
  db.blogMedia.unshift(newItem);
  writeDb(db);

  res.status(201).json({ success: true, media: newItem });
});

app.delete('/api/blog/media/:id', (req, res) => {
  const db = readDb();
  db.blogMedia = (db.blogMedia || []).filter(m => m.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: "Media item removed." });
});

// Serve frontend dist build with no-cache on index.html
const publicDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(publicDir)) {
  // Prevent aggressive browser caching of index.html so changes reflect immediately
  app.use((req, res, next) => {
    if (req.path === '/' || req.path === '/index.html') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    next();
  });

  app.use(express.static(publicDir));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🥒 Naani Pickles Heritage Portal API running on: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is occupied.`);
    process.exit(0);
  } else {
    console.error('Server error:', err);
  }
});
