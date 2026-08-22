/**
 * HTTP API Client for Frontend
 * Unified via src/utils/api.js with VITE_API_URL environment configuration
 */
import { api, API_BASE_URL, getToken, setToken, removeToken } from '../utils/api';

export { API_BASE_URL, getToken, setToken, removeToken };

export const apiClient = api;

export default apiClient;
