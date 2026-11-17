import SeedPage from "./pages/SeedPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import VendorPage from "./pages/VendorPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Week 5: Firebase Authentication
import { AuthProvider } from "./context/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="vendor/:id" element={<VendorPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {import.meta.env.DEV && (
              <Route path="seed" element={<SeedPage />} />
            )}

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>

            {/* Not found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
