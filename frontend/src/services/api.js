// ============================================================
// src/services/api.js
// Centralized API service for Annmitra
// ============================================================
//
// PURPOSE:
// This file is the SINGLE place that talks to the backend.
// No React component should ever call fetch() directly.
// Instead, components call functions from this file like:
//   import { authAPI } from '../services/api';
//   const data = await authAPI.login(email, password);
//
// WHY:
// 1. If the backend URL or response format changes, we update ONE file
// 2. Error handling is consistent everywhere
// 3. Easy to add auth headers, logging, etc. in one spot
// ============================================================

// The base URL comes from the .env file.
// During development, Vite's proxy forwards /api requests to localhost:5050,
// so we use an empty string (meaning "same origin") as the default.
// In production, you'd set VITE_API_BASE_URL to your deployed backend URL.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * A wrapper around fetch() that handles common tasks:
 * - Adds Content-Type header for JSON requests
 * - Includes credentials (cookies) with every request
 * - Parses the JSON response
 * - Throws a useful error object if the request fails
 *
 * @param {string} endpoint - The API path, e.g. '/api/auth/login'
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<object>} The parsed JSON response
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // Default headers — we always send JSON
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers // Allow overriding if needed
  };

  // credentials: 'include' tells the browser to send and receive
  // HttpOnly cookies. This is essential for our JWT cookie auth.
  const config = {
    ...options,
    headers,
    credentials: 'include'
  };

  try {
    const response = await fetch(url, config);

    // Try to parse the response as JSON.
    // Some responses (like 204 No Content) may not have a body.
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = {};
    }

    // If the HTTP status is not OK (200-299), throw an error
    // so the calling code can catch it and show a message.
    if (!response.ok) {
      const error = new Error(data.error || data.message || 'Something went wrong');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Network error — the backend is unreachable
    // (e.g. teammate's server isn't running)
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      const networkError = new Error(
        'Cannot connect to the server. Please check if the backend is running.'
      );
      networkError.status = 0;
      networkError.isNetworkError = true;
      throw networkError;
    }

    // Re-throw API errors (from the block above) as-is
    throw error;
  }
}

// ============================================================
// AUTH API — All authentication-related endpoints
// ============================================================

export const authAPI = {
  /**
   * Register a new farmer or buyer account.
   *
   * @param {object} userData - { name, email, password, phone, role, farmName?, location }
   * @returns {Promise<object>} - { message, user }
   */
  register: (userData) => {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  /**
   * Log in with email and password.
   * The backend will set an HttpOnly cookie with the JWT token.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} - { message, user }
   */
  login: (email, password) => {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  /**
   * Get the currently authenticated user.
   * Called on page load to check if the session is still valid.
   * The browser sends the HttpOnly cookie automatically.
   *
   * @returns {Promise<object>} - { user } or throws 401
   */
  getMe: () => {
    return request('/api/auth/me', {
      method: 'GET'
    });
  },

  /**
   * Log out the current user.
   * The backend should clear the auth cookie.
   *
   * @returns {Promise<object>} - { message }
   */
  logout: () => {
    return request('/api/auth/logout', {
      method: 'POST'
    });
  }
};
