import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { authErrorMessage } from "../authErrors.js";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const goTo = location.state?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      await login(email, password);
      navigate(goTo, { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setBusy(true);

    try {
      await loginWithGoogle();
      navigate(goTo, { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Log in to CampusEats</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={busy}>
          {busy ? "Logging in..." : "Log in"}
        </button>
      </form>

      <button type="button" onClick={handleGoogle} disabled={busy}>
        Continue with Google
      </button>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </main>
  );
}
