function Header({ cartCount, onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav">
        <button type="button" onClick={() => onNavigate("menu")}>
          Vendors
        </button>

        <button
          type="button"
          onClick={() => onNavigate("cart")}
          className="cart"
        >
          Cart <span className="badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
