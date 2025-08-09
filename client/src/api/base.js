// client/src/api/base.js
const RAW = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// remove any trailing slashes so we don't get //api/...
export const API_BASE = RAW.replace(/\/+$/, '');

// safe url joiner (avoids double slashes)
export const apiUrl = (path) => new URL(path, API_BASE).toString();
