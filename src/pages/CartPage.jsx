import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import Cart from "../components/CartPage.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

function CartPage() {
  const { cart, placeOrder } = useCart();
  const navigate = useNavigate();

  function handlePlaceOrder(orderDetails) {
    const order = placeOrder(orderDetails);

    if (!order) return;

    navigate("/orders");
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
            <CheckoutForm onPlaceOrder={handlePlaceOrder} />
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
