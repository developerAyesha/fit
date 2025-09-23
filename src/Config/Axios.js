import axios from "axios";
import TokenManager from "../utils/tokenManager.js";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1", // your backend base URL
  withCredentials: true, //  always send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
Axios.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle API responses and token storage
Axios.interceptors.response.use(
  (response) => {
  
    // Check if this is a login response with access token
    if (response.config.url?.includes('/auth/login') && response.data?.data?.accessToken) {
      const accessToken = response.data.data.accessToken;
    
      TokenManager.setAccessToken(accessToken);
     
    }
    
    // Check if this is a register response with access token
    if (response.config.url?.includes('/auth/register') && response.data?.data?.accessToken) {
      const accessToken = response.data.data.accessToken;
      TokenManager.setAccessToken(accessToken);
   
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
     
      TokenManager.removeAccessToken();
      
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
