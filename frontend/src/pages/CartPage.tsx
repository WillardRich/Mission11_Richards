import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item: CartItem) => (
              <li
                key={item.book.bookID}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.book.title}</strong>
                  <div>Price: ${item.book.price.toFixed(2)}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>
                    Subtotal: $
                    {(item.book.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    removeFromCart(item.book.bookID)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <h3 className="mt-3">
          Total: ${getTotal().toFixed(2)}
        </h3>
      )}

      <div className="mt-3">
        <button className="btn btn-primary me-2">
          Checkout
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/books')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartPage;