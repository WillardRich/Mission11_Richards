function CartSummary() {
  return (
    <div className="card p-3">
      <h5>Cart Summary</h5>
      <p>Items: 0</p>
      <p>Total: $0.00</p>
      <button className="btn btn-success">Go to Cart</button>
    </div>
  );
}

export default CartSummary;