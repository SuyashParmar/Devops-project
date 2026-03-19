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

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

module.exports = app;
