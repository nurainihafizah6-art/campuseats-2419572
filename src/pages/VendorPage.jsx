import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useVendors } from "../hooks/useVendors.js";
import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../hooks/useAuth.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, retry } = useVendors();
  const { user } = useAuth();

  // Each logged-in user gets a unique storage key
  const storageKey = user ? `ce-sort-${user.uid}` : null;

  const [sortBy, setSortBy] = useState("default");

  // Load the correct preference when the user changes
  useEffect(() => {
    if (!storageKey) {
      setSortBy("default");
      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      const preference = saved ? JSON.parse(saved) : "default";

      const validOptions = ["default", "price-low", "price-high", "popular"];

      setSortBy(validOptions.includes(preference) ? preference : "default");
    } catch (error) {
      console.error("Error reading sort preference:", error);
      setSortBy("default");
    }
  }, [storageKey]);

  // Save only when a logged-in user changes the dropdown
  function handleSortChange(event) {
    const selected = event.target.value;
    setSortBy(selected);

    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(selected));
      } catch (error) {
        console.error("Error saving sort preference:", error);
      }
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  const vendor = vendors.find((v) => String(v.id) === id);

  if (!vendor) {
    return <p>Vendor not found.</p>;
  }

  const sortedMenu = [...vendor.menu].sort((a, b) => {
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
  });

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="sort-menu">Sort menu by: </label>

        <select
          id="sort-menu"
          value={sortBy}
          onChange={handleSortChange}
          disabled={!user}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>

        {!user && <p>Log in to save your sorting preference.</p>}
      </div>

      <MenuList items={sortedMenu} />
    </section>
  );
}

export default VendorPage;
