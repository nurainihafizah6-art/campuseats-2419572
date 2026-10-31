import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  return (
    <section>
      <h2 className="section-title">Order History</h2>

      {orders.length === 0 ? (
        <>
          <p>You haven't placed any orders yet.</p>
          <Link to="/">Browse Vendors</Link>
        </>
      ) : (
        <>
          {orders.map((order) => (
            <div className="order-confirmation" key={order.id}>
              <h3>Order placed successfully!</h3>

              <p>
                <strong>Name:</strong> {order.name}
              </p>

              <p>
                <strong>Mahallah:</strong> {order.mahallah}
              </p>

              <p>
                <strong>Pickup Time:</strong> {order.pickupTime}
              </p>

              <h3>Ordered Items</h3>

              <ul>
                {order.items.map((line) => (
                  <li key={line.item.id}>
                    {line.item.name} x {line.qty}
                    {" — RM "}
                    {(line.item.price * line.qty).toFixed(2)}
                  </li>
                ))}
              </ul>

              <h3>Total: RM {order.total.toFixed(2)}</h3>
            </div>
          ))}

          <Link to="/">Back to Vendors</Link>
        </>
      )}
    </section>
  );
}

export default OrdersPage;
