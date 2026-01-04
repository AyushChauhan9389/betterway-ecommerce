import { useState, useMemo } from 'react';
import './styles/App.css';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import { useLocalStorage } from './hooks/useLocalStorage';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Cart from './components/Cart';
import ProductPopup from './components/ProductPopup';
import type { Product, CartItem } from './types';

function App() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useLocalStorage<CartItem[]>('shopeasy-cart', []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return [...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
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
  }, [products, debouncedSearch, selectedCategory, sortOrder]);

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

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
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
            onViewProduct={handleViewProduct}
          />
        </section>
        <aside className="cart-section">
          <Cart
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </aside>
      </main>

      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;
