import { API_BASE } from './base';

export const signup = async (user) => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const signin = async (user) => {
  const res = await fetch(`${API_BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    if (typeof next === 'function') next();
  }
};

// Note: if your server sets cookies, include credentials here.
// fetch(`${API_BASE}/api/auth/signout`, { method: 'GET', credentials: 'include' })
export const signout = async () => {
  const res = await fetch(`${API_BASE}/api/auth/signout`, { method: 'GET' });
  return res.json();
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem('jwt');
  return raw ? JSON.parse(raw) : false;
};

export const isAdmin = () => {
  const auth = isAuthenticated();
  return !!(auth && auth.user && auth.user.role === 'admin');
};
