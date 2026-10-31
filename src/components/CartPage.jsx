import { useCart } from "../hooks/useCart.js";
import CartItem from "./CartItem.jsx";

function CartPage() {
  const { cart, changeQty: onChangeQty, removeFromCart: onRemove } = useCart();

  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-panel">
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

      <div className="cart-summary">
        <h3>Total: RM {total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CartPage;
