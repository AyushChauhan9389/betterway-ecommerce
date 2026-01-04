import type { Product } from '../types';
import './ProductCard.css';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: Props) {
  const inStock = product.stock > 0;

  return (
    <div className="product-card">
      <img 
        src={product.thumbnail} 
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
        </span>
        <button
          className="add-to-cart-button"
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

