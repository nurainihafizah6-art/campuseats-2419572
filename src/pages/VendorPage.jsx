import { useParams } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useVendors } from "../hooks/useVendors.js";
import { useCart } from "../hooks/useCart.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, retry } = useVendors();
  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useLocalStorage("campuseats-sort", "default");

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
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <MenuList items={sortedMenu} />
    </section>
  );
}

export default VendorPage;
