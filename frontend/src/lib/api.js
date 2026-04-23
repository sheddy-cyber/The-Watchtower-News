// frontend/src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // send cookies (refresh token)
  timeout: 10000,
});

// ── Request interceptor: attach access token ──────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor: silent token refresh on 401 ────────────────────
let refreshing = null; // deduplicate concurrent refresh calls

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (
      err.response?.status === 401 &&
      err.response?.data?.code === "TOKEN_EXPIRED" &&
      !original._retry
    ) {
      original._retry = true;

      if (!refreshing) {
        refreshing = api
          .post("/auth/refresh")
          .then((r) => {
            localStorage.setItem("accessToken", r.data.accessToken);
            return r.data.accessToken;
          })
          .catch(() => {
            localStorage.removeItem("accessToken");
            window.dispatchEvent(new Event("auth:logout"));
          })
          .finally(() => { refreshing = null; });
      }

      const newToken = await refreshing;
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(err);
  }
);

export default api;

// ── Typed helpers ─────────────────────────────────────────────────────────
export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
  me: () => api.get("/auth/me"),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
};

export const articlesApi = {
  list: (params) => api.get("/articles", { params }),
  get: (id) => api.get(`/articles/${id}`),
  trending: () => api.get("/articles/trending"),
  search: (q) => api.get("/articles/search", { params: { q } }),
  byCategory: (cat, page = 1) => api.get("/articles", { params: { category: cat, page } }),
};

export const bookmarksApi = {
  list: () => api.get("/bookmarks"),
  add: (id) => api.post(`/bookmarks/${id}`),
  remove: (id) => api.delete(`/bookmarks/${id}`),
};

export const newsletterApi = {
  subscribe: (email) => api.post("/newsletter/subscribe", { email }),
  unsubscribe: (token) => api.post("/newsletter/unsubscribe", { token }),
};
