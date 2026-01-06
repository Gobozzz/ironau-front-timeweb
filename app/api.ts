import axios from "axios";
import { API_URL } from "@constants";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(async (config) => {
  if (!config.url?.includes("/csrf-cookie")) {
    await axios.get(`${API_URL}/csrf-cookie`, {
      withCredentials: true,
    });
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { store } = await import("@/app/redux/store");
      const { logoutMemory } = await import("@/app/redux/slices/authSlice");
      store.dispatch(logoutMemory());
    }
    return Promise.reject(error);
  }
);

export default api;
