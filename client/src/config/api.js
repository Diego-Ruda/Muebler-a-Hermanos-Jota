/* global process */
const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

export const PRODUCTS_API_URL = `${API_BASE_URL}/api/productos`;
export const LOGIN_API_URL = `${API_BASE_URL}/login`;
export const REGISTER_API_URL = `${API_BASE_URL}/registro`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/users/profile`;
export const AUTH_TOKEN_KEY = 'hj_access_token';
export const AUTH_USER_KEY = 'hj_user';

export function getAuthHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
