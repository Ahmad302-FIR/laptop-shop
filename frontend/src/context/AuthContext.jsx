import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, getToken, setToken, removeToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get('/admin/me');
        if (res.success && res.admin) {
          setAdmin(res.admin);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification notice:', err.message);
        // If 401, remove token
        if (err.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await apiClient.post('/admin/login', { username, password });
      if (res.success && res.token) {
        setToken(res.token);
        setTokenState(res.token);
        setAdmin(res.admin);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Invalid credentials'
      };
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
