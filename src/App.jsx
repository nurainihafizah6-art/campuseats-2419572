import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [completedOrder, setCompletedOrder] = useState(null);
  const [view, setView] = useState("menu");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setSelectedVendorId((prev) => prev ?? data[0]?.id ?? null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  const sortedMenu = selectedVendor
    ? [...selectedVendor.menu].sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }

        if (sortBy === "price-high") {
          return b.price - a.price;
        }

        if (sortBy === "popular") {
          return b.popularity - a.popularity;
        }

        return 0;
      })
    : [];

  const cartCount = cart.reduce((total, line) => total + line.qty, 0);

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...prev, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function handlePlaceOrder(orderDetails) {
    const order = {
      ...orderDetails,
      items: cart,
      total: cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    };

    setCompletedOrder(order);
    console.log("Order placed:", order);

    setCart([]);
    setView("done");
  }

  if (loading) {
    return (
      <>
        <Header cartCount={cartCount} onNavigate={setView} />
        <main className="container">
          <Loading />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cartCount={cartCount} onNavigate={setView} />
        <main className="container">
          <ErrorMessage
            message={error}
            onRetry={() => setReloadKey((prev) => prev + 1)}
          />
        </main>
        <Footer />
      </>
    );
  }

  if (!selectedVendor) {
    return (
      <>
        <Header cartCount={cartCount} onNavigate={setView} />
        <main className="container">
          <p>No vendor available.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} onNavigate={setView} />

      <main className="container">
        {view === "menu" ? (
          <>
            <section>
              <h2 className="section-title">Choose a vendor</h2>

              <div className="vendor-grid">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={vendor.id === selectedVendorId}
                    onSelect={setSelectedVendorId}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="section-title">Menu: {selectedVendor.name}</h2>

              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="sort-menu">Sort menu by: </label>

                <select
                  id="sort-menu"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <MenuList items={sortedMenu} onAdd={handleAddToCart} />
            </section>
          </>
        ) : view === "cart" ? (
          <CartPage
            cart={cart}
            onChangeQty={handleChangeQty}
            onRemove={handleRemove}
            onCheckout={() => setView("checkout")}
          />
        ) : view === "checkout" ? (
          <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        ) : (
          <section className="order-confirmation">
            <h2 className="section-title">Order Confirmation</h2>

            <h3>Order placed successfully!</h3>

            {completedOrder && (
              <div>
                <p>
                  <strong>Name:</strong> {completedOrder.name}
                </p>

                <p>
                  <strong>Mahallah:</strong> {completedOrder.mahallah}
                </p>

                <p>
                  <strong>Pickup Time:</strong> {completedOrder.pickupTime}
                </p>

                <h3>Ordered Items</h3>

                <ul>
                  {completedOrder.items.map((line) => (
                    <li key={line.item.id}>
                      {line.item.name} x {line.qty}
                      {" — RM "}
                      {(line.item.price * line.qty).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <h3>Total: RM {completedOrder.total.toFixed(2)}</h3>
              </div>
            )}

            <button type="button" onClick={() => setView("menu")}>
              Back to Vendors
            </button>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
