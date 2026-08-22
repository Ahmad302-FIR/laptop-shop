/**
 * Centralized API configuration and client dispatcher
 * Reads VITE_API_URL from frontend/.env with fallback to http://localhost:5000
 */

const RAW_API_URL =
  import.meta.env.VITE_API_URL || 'https://laptop-shop-backend.vercel.app';

// Ensure the base URL ends with /api for all REST endpoints
export const API_BASE_URL = RAW_API_URL.endsWith('/api')
  ? RAW_API_URL
  : `${RAW_API_URL.replace(/\/$/, '')}/api`;

const TOKEN_KEY = 'yasin_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Universal JSON fetch helper with JWT bearer authorization
 */
export const fetchApi = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `API request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      error.message = `Unable to connect to backend server at ${API_BASE_URL}. Ensure backend is running on port 5000.`;
    }
    throw error;
  }
};

export const api = {
  get: (endpoint, headers) => fetchApi(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) =>
    fetchApi(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
  put: (endpoint, body, headers) =>
    fetchApi(endpoint, { method: 'PUT', body: JSON.stringify(body), headers }),
  patch: (endpoint, body, headers) =>
    fetchApi(endpoint, { method: 'PATCH', body: JSON.stringify(body), headers }),
  delete: (endpoint, headers) => fetchApi(endpoint, { method: 'DELETE', headers })
};

export default api;
