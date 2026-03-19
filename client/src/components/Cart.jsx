export default function Cart({ items, onUpdateQuantity, onRemove, onCheckout }) {
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 5 }).format(price);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Your cart
      </h2>

      {items.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-header">
                  <span className="cart-item-title">{item.title}</span>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>×</button>
                </div>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                  <span style={{fontWeight: 600}}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}
