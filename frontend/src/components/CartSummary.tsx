import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartSummary() {
  const navigate = useNavigate();
  const { getTotal, getItemCount } = useCart();

  return (
    <div
      className="position-fixed top-0 end-0 m-3 bg-light p-2 rounded shadow d-flex align-items-center"
      style={{ cursor: 'pointer' , zIndex: 1000}}
      
      onClick={() => navigate('/cart')}
    >
      🛒
      <span className="ms-2 fw-bold">
        ${getTotal().toFixed(2)}
      </span>

      {/* ✅ BADGE */}
      <span className="badge bg-danger ms-2">
        {getItemCount()}
      </span>
    </div>
  );
}

export default CartSummary;