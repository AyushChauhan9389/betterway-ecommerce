import type { Product } from '../types';
import '../styles/ProductPopup.css';

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

function ProductPopup({ product, onClose, onAddToCart }: Props) {
  const inStock = product.stock > 0;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-backdrop" onClick={handleBackdropClick}>
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        
        <div className="popup-image-section">
          <span className="popup-category">{product.category}</span>
          <img src={product.thumbnail} alt={product.title} className="popup-image" />
        </div>

        <div className="popup-details">
          <h2 className="popup-title">{product.title}</h2>
          <p className="popup-description">{product.description}</p>
          
          <div className="popup-meta">
            <span className="popup-price">${product.price.toFixed(2)}</span>
            <span className={`popup-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button
            className="popup-add-btn"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;

