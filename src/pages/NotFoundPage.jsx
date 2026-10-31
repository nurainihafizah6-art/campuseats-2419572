import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section>
      <h2 className="section-title">404 - Page Not Found</h2>

      <p>Oops! The page you're looking for doesn't exist.</p>

      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default NotFoundPage;
