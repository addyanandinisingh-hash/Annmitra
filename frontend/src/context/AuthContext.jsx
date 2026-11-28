// ============================================================
// src/context/AuthContext.jsx
// Global authentication state for Annmitra
// ============================================================
//
// PURPOSE:
// This file manages the "who is logged in?" state for the entire app.
// Instead of passing currentUser, setCurrentUser, login, logout
// through 5+ levels of props, any component can just do:
//
//   import { useAuth } from '../context/AuthContext';
//   const { user, login, logout, loading } = useAuth();
//
// WHY React Context?
// Your App.jsx currently passes auth props like this:
//   App → Navbar → (uses currentUser, setCurrentUser)
//   App → AuthModal → (uses onLoginSuccess)
//   App → Home → Hero → (uses openAuthModal)
//
// With Context, any component can access auth state directly.
// We're NOT removing the existing prop-passing yet — we'll
// integrate gradually to avoid breaking anything.
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

// 1. Create the Context — think of this as a "global container"
const AuthContext = createContext(null);

// 2. Create the Provider component — this wraps your entire app
//    and holds the auth state + functions
export function AuthProvider({ children }) {
  // The currently logged-in user (null means not logged in)
  const [user, setUser] = useState(null);

  // True while we're checking if the user is already logged in
  // (on page load / refresh). We show a loading state instead of
  // briefly flashing the "not logged in" UI.
  const [loading, setLoading] = useState(true);

  // Stores any auth error message to display in the UI
  const [authError, setAuthError] = useState(null);

  // ──────────────────────────────────────────────
  // Check session on page load (persistence!)
  // ──────────────────────────────────────────────
  // When the user refreshes the page, React state resets to null.
  // But the HttpOnly cookie is still in the browser!
  // So we call GET /api/auth/me to ask the backend: "Am I still logged in?"
  // If yes → we get the user object back and restore the session.
  // If no → we get a 401 and just stay logged out (not an error).
  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const data = await authAPI.getMe();
      setUser(data.user);
    } catch (error) {
      // 401 = not logged in. That's normal, not an error.
      // Network error = backend not running. Also not critical on load.
      setUser(null);
    } finally {
      // Whether success or failure, we're done loading
      setLoading(false);
    }
  }

  // ──────────────────────────────────────────────
  // Login function
  // ──────────────────────────────────────────────
  // Called by AuthModal when the user submits the login form.
  // Returns the user object on success; throws on failure.
  async function login(email, password) {
    setAuthError(null);
    try {
      const data = await authAPI.login(email, password);
      setUser(data.user);
      return data.user;
    } catch (error) {
      setAuthError(error.message);
      throw error; // Let the form component handle it too
    }
  }

  // ──────────────────────────────────────────────
  // Register function
  // ──────────────────────────────────────────────
  // Called by AuthModal when the user submits the registration form.
  // On success, the user is automatically logged in (backend sets cookie).
  async function register(userData) {
    setAuthError(null);
    try {
      const data = await authAPI.register(userData);
      setUser(data.user);
      return data.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  // ──────────────────────────────────────────────
  // Logout function
  // ──────────────────────────────────────────────
  // Calls the backend to clear the cookie, then clears local state.
  async function logout() {
    try {
      await authAPI.logout();
    } catch (error) {
      // Even if the API call fails (e.g. backend is down),
      // still clear the local user state so the UI updates.
      console.warn('Logout API call failed:', error.message);
    } finally {
      setUser(null);
      setAuthError(null);
    }
  }

  // ──────────────────────────────────────────────
  // Clear error (for dismissing error messages)
  // ──────────────────────────────────────────────
  function clearAuthError() {
    setAuthError(null);
  }

  // 3. Package everything into a value object that any component can access
  const value = {
    user,         // The current user object (or null)
    loading,      // True during initial session check
    authError,    // Error message string (or null)
    login,        // async function(email, password)
    register,     // async function(userData)
    logout,       // async function()
    clearAuthError // function to dismiss error
  };

  // 4. Provide the value to all children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom hook — the clean way for components to use auth state
//    Usage: const { user, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() must be used inside an <AuthProvider>');
  }
  return context;
}
