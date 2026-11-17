import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { authErrorMessage } from "../authErrors.js";

export default function RegisterPage() {
  const { register } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const goTo = location.state?.from ?? "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    setError("");
    setBusy(true);

    try {
      await register(name.trim(), email, password);
      navigate(goTo, { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Create your CampusEats account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={busy}>
          {busy ? "Creating account..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </main>
  );
}
