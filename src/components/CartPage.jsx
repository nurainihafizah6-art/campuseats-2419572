import CartItem from "./CartItem.jsx";

function CartPage({ cart, onChangeQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  if (cart.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Cart</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">My Cart</h2>

      <div className="cart-list">
        {cart.map((line) => (
          <CartItem
            key={line.item.id}
            line={line}
            onChangeQty={onChangeQty}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: RM {total.toFixed(2)}</h3>

        <button type="button" className="btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

export default CartPage;
