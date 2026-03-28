import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3 p-3">
              <h5>{item.title}</h5>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ${getTotal().toFixed(2)}</h3>

          <button className="btn btn-warning me-2" onClick={clearCart}>
            Clear Cart
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;