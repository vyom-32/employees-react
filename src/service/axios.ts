import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axiosInstance;
