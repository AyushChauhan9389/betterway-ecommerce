import type { Product } from '../types';
import '../styles/ProductCard.css';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

function ProductCard({ product, onAddToCart, onViewProduct }: Props) {
  const inStock = product.stock > 0;

  const handleCardClick = () => {
    onViewProduct(product);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-wrapper">
        <span className="product-category-badge">{product.category}</span>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-row">
          <p className="product-price">${product.price.toFixed(2)}</p>
          <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? `${product.stock} left` : 'Sold out'}
          </span>
        </div>
        <button
          className="add-to-cart-button"
          onClick={handleAddClick}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
