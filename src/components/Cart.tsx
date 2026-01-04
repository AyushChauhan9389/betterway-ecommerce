import type { CartItem } from '../types';
import '../styles/Cart.css';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

function Cart({ items, onUpdateQuantity, onRemoveItem }: Props) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>🛒</p>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      <ul className="cart-items">
        {items.map(item => (
          <li key={item.product.id} className="cart-item">
            <div className="cart-item-info">
              <img src={item.product.thumbnail} alt={item.product.title} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-title">{item.product.title}</span>
                <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="qty-button"
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  className="qty-button"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => onRemoveItem(item.product.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="summary-row total">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;

