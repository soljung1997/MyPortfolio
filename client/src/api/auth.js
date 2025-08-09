export const signup = async (user) => {
  return fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(res => res.json());
};

export const signin = async (user) => {
  return fetch('http://localhost:5000/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(res => res.json());
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = async () => {
  return fetch('http://localhost:5000/api/auth/signout', {
    method: 'GET',
  }).then(res => res.json());
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }
  return false;
};

export const isAdmin = () => {
  const auth = isAuthenticated();
  return auth && auth.user && auth.user.role === 'admin';
};
