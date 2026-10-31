import { Link } from "react-router";
import VendorCard from "../components/VendorCard.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function HomePage() {
  const { vendors, loading, error, retry } = useVendors();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
