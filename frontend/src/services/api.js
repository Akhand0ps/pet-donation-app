import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  // Only send token for admin/protected routes
  const isProtected =
    config.url.startsWith("/admin") ||
    config.url.startsWith("/animals") && config.method !== "get" ||
    config.url.startsWith("/donations") && config.method !== "get" ||
    config.url.startsWith("/payment");

  const token = localStorage.getItem("adminToken");
  if (token && isProtected) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api
