import { useState, useMemo } from 'react';
import './App.css';
import { useProducts } from './hooks/useProducts';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import type { Product, CartItem } from './types';

function App() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return [...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return prevCart;
        }
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 ShopEasy</h1>
        <div className="cart-badge">
          🛍️ Cart ({totalItems} items)
        </div>
      </header>
      
      <main className="main-content">
        <section className="products-section">
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onClearFilters={handleClearFilters}
          />
          <ProductList
            products={filteredProducts}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </section>
        <aside className="cart-section">
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.product.id} className="cart-item">
                    <span>{item.product.title}</span>
                    <span>x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
