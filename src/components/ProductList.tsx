import type { Product } from '../types';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

interface Props {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

function ProductList({ products, loading, error, onAddToCart, onViewProduct }: Props) {
  if (loading) {
    return <div className="products-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="products-error">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="products-empty">No products found</div>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;
