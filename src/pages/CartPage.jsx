import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { placeOrders } from "../services/orders.js";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import Cart from "../components/CartPage.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

function CartPage() {
  const { cart, total, changeQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");

  async function handlePlaceOrder(details) {
    setError("");

    try {
      await placeOrders(user, cart, details);
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(`Could not place the order: ${err.message}`);
    }
  }

  return (
    <section>
      <h2 className="section-title">My Cart</h2>

      <div className="cart-checkout-layout">
        <div className="cart-column">
          <Cart />
        </div>

        {cart.length > 0 && (
          <div className="checkout-column">
            <CheckoutForm
              defaultName={user?.displayName ?? ""}
              onPlaceOrder={handlePlaceOrder}
            />

            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
