const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route with MySQL test
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({
      status: 'ok',
      db_status: 'connected',
      message: 'ShopSmart Backend is running with MySQL',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      status: 'warning',
      db_status: 'disconnected',
      message: 'Backend running, but MySQL connection failed',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Products Route
app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      title: '4K Camera Drone',
      desc: 'Capture stunning aerial photography with 3-axis gimbal stabilization and 40-min flight time.',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80',
      isNew: true
    },
    {
      id: 2,
      title: 'Next-Gen Game Console',
      desc: 'Experience lightning-fast loading, ultra-high speed SSD, and breathtaking 3D audio.',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80',
      isNew: false
    },
    {
      id: 3,
      title: 'VR Headset System',
      desc: 'Immersive virtual reality headset with 360-degree tracking and dual wireless controllers.',
      price: 29999,
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80',
      isNew: true
    }
  ]);
});

// Checkout Route (Saving to Backend)
app.post('/api/checkout', (req, res) => {
  const { items, total } = req.body;
  
  // Simulated Backend Save (Logs order to console permanently)
  console.log(`\n========= NEW ORDER SAVED SERVER-SIDE =========`);
  console.log(`Total Value: ₹${total}`);
  if (items && items.length > 0) {
      items.forEach(item => {
          console.log(` - ${item.quantity}x ${item.title} (₹${item.price} each) `);
      });
  }
  console.log(`===============================================\n`);

  res.json({ success: true, message: 'Order accurately saved to backend server log.' });
});

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

module.exports = app;
