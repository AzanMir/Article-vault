import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);

// ─── Articles ────────────────────────────────────────────────────────────────
export const getAllArticles  = ()       => api.get("/articles");
export const getArticleById = (id)     => api.get(`/articles/${id}`);
export const getMyArticles  = ()       => api.get("/articles/my-articles");
export const createArticle  = (data)   => api.post("/articles", data);
export const updateArticle  = (id, data) => api.put(`/articles/${id}`, data);
export const deleteArticle  = (id)     => api.delete(`/articles/${id}`);

export default api;
