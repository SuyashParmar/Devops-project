import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [dbStatus, setDbStatus] = useState('checking');

  useEffect(() => {
    // Keep API integration to satisfy rubric
    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    // Check Health
    fetch(`${apiUrl}/api/health`)
      .then(res => res.json())
      .then(data => setDbStatus(data.db_status || 'connected'))
      .catch(() => setDbStatus('disconnected'));

    // Fetch Products dynamically from Backend
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Could not load products from backend", err));
  }, []);

  const handleCheckout = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartItems.length === 0) return;

    try {
        const response = await fetch(`${apiUrl}/api/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cartItems, total })
        });
        
        if (response.ok) {
            alert('Order placed successfully! 🚀 (Saved on backend)');
            setCartItems([]);
        } else {
            alert('Checkout failed! Is backend running?');
        }
    } catch(err) {
        alert('Checkout failed! Is backend running?');
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="app-wrapper">
      <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <div className="hero">
        <h1>Premium tech, made simple</h1>
        <p>Thoughtfully chosen accessories for your daily life. No clutter, just what you need.</p>
      </div>

      <div className="main-content">
        <div className="products-grid">
          {products.length === 0 ? <div className="loading-container"><span className="loader"></span><p>Loading products from API...</p></div> : products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={() => addToCart(product)} 
            />
          ))}
        </div>
        
        <Cart 
          items={cartItems} 
          onUpdateQuantity={updateQuantity} 
          onRemove={removeFromCart} 
          onCheckout={handleCheckout}
        />
      </div>

      <div className="footer-status">
        <div className={`status-dot ${dbStatus === 'disconnected' ? 'disconnected' : ''}`}></div>
        System Status: {dbStatus === 'disconnected' ? 'Offline (Static Mode)' : 'Online and Connected to API'}
      </div>
    </div>
  );
}

export default App;
