import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1/", // your backend base URL
  withCredentials: true, // 🔑 always send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle API responses
// Axios.interceptors.response.use(
//   (response) => {
//     // Your backend returns { success: true, data: [...] } format
//     return response;
//   },
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

export default Axios;
