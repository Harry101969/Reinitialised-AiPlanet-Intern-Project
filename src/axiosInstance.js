// axiosInstance.js

import axios from 'axios';

// Create an instance with custom headers
const axiosInstance = axios.create({
    baseURL: '/api', // Adjust the baseURL as per your backend setup
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Replace '*' with your frontend's origin in production
        // Add other CORS headers as needed
    }
});

export default axiosInstance;
