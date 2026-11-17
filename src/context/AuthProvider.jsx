import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase.js";
import { AuthContext } from "./auth-context.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for login and logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register a new account
  async function register(name, email, password) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(credential.user, {
      displayName: name,
    });

    setUser({
      ...credential.user,
      displayName: name,
    });
  }

  // Login using email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Login using Google
  function loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
