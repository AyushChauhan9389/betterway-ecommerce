import { useState } from 'react';
import './App.css';
import { useProducts } from './hooks/useProducts';
import ProductList from './components/ProductList';
import type { Product, CartItem } from './types';

function App() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useState<CartItem[]>([]);

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
          <ProductList
            products={products}
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
