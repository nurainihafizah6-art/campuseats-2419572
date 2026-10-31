import { Link } from "react-router";

function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="vendor-card-link">
      <div className="vendor-card">
        <h3>{vendor.name}</h3>

        {vendor.description && <p>{vendor.description}</p>}
      </div>
    </Link>
  );
}

export default VendorCard;
