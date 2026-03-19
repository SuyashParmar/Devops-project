export default function ProductCard({ product, onAdd }) {
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 5 }).format(price);

  return (
    <div className="product-card">
      <div className="product-img-container">
        {product.isNew && <span className="badge-new">New</span>}
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="add-btn" onClick={onAdd}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
