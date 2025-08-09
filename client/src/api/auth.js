import { apiUrl } from './base';

const jsonFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // non-JSON response is fine; keep data = null
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
};

export const signup = (user) =>
  jsonFetch(apiUrl('/api/auth/signup'), {
    method: 'POST',
    body: JSON.stringify(user),
  });

export const signin = (user) =>
  jsonFetch(apiUrl('/api/auth/signin'), {
    method: 'POST',
    body: JSON.stringify(user),
  });

// If your server uses cookies for sessions, add: credentials: 'include'
export const signout = () =>
  jsonFetch(apiUrl('/api/auth/signout'), {
    method: 'GET',
  });

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    if (typeof next === 'function') next();
  }
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
