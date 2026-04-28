import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { getAccessToken, isTokenExpired } from '@/lib/auth/token';

const baseURL = 'http://localhost:8000/api/v1/';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            if (isTokenExpired(token)) {
                useAuthStore.getState().clearAuth();
                return Promise.reject(new axios.Cancel('Access token expired.'));
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to clear auth state on unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Skip refresh logic for login and register endpoints
        const isAuthRequest = originalRequest.url?.includes('auth/login') || 
                             originalRequest.url?.includes('auth/register');

        if (error.response?.status === 401 && !isAuthRequest) {
            useAuthStore.getState().clearAuth();
        }

        return Promise.reject(error);
    }
);

export default api;
