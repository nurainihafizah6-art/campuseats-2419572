import { useState } from "react";
import { Link, useParams } from "react-router";
import { useVendor } from "../hooks/useVendor.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function VendorPage() {
  const { id } = useParams();

  // Student selects how the menu should be sorted.
  const [sortBy, setSortBy] = useState("default");

  // Firestore will return the menu in the selected order.
  const { vendor, menu, loading, error } = useVendor(id, sortBy);

  if (loading) return <Loading />;

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (!vendor) {
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    );
  }

  const items = menu.map((item) => ({
    ...item,
    vendorName: vendor.name,
  }));

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>

      <h2 className="section-title">{vendor.name}</h2>

      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>

      <div className="sort-controls">
        <label htmlFor="menu-sort">Sort menu by:</label>

        <select
          id="menu-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popularity">Popularity: High to Low</option>
        </select>
      </div>

      <MenuList items={items} />
    </section>
  );
}

export default VendorPage;
