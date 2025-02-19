// src/utils/axiosConfig.js

import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Request Interceptor to add Bearer token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or any other secure place)
    const token = localStorage.getItem("saadToken");
    console.log(token);

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle any request errors here (optional)
    return Promise.reject(error);
  }
);

// Axios Response Interceptor (Optional)
// Handle responses globally, e.g., for authentication errors, logging, etc.
axiosInstance.interceptors.response.use(
  (response) => response, // You can modify the response here if needed
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized access, please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
