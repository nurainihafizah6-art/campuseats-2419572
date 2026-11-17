import { NavLink, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../hooks/useAuth.js";

function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav">
        <NavLink to="/" end>
          Vendors
        </NavLink>

        <NavLink to="/cart" className="cart">
          Cart <span className="badge">{count}</span>
        </NavLink>

        <NavLink to="/orders">Orders</NavLink>

        {user ? (
          <>
            <span>Hi, {user.displayName || user.email}</span>

            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
