/* global process */
const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

export const PRODUCTS_API_URL = `${API_BASE_URL}/api/productos`;
