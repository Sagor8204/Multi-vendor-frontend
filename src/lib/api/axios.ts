import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { getAccessToken, isTokenExpired } from '@/lib/auth/token';
import toast from 'react-hot-toast';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token and handle slow server warnings
api.interceptors.request.use(
    (config) => {
        // Add a custom property to track the start time
        (config as any).metadata = { startTime: new Date() };
        
        // Show "Waking up" toast if request takes too long
        const timeoutId = setTimeout(() => {
            toast('Server is waking up... Please stay with us!', {
                icon: '☕',
                id: 'warmup-toast', // Prevent multiple toasts
                duration: 6000,
            });
        }, 4000); // 4 seconds threshold

        (config as any).warmupTimeoutId = timeoutId;

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

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Clear the warmup timeout if response arrives
        const timeoutId = (response.config as any).warmupTimeoutId;
        if (timeoutId) clearTimeout(timeoutId);
        toast.dismiss('warmup-toast');

        return response;
    },
    (error) => {
        // Clear the warmup timeout on error too
        const timeoutId = (error.config as any)?.warmupTimeoutId;
        if (timeoutId) clearTimeout(timeoutId);
        toast.dismiss('warmup-toast');

        const originalRequest = error.config;
        
        // Skip refresh logic for login and register endpoints
        const isAuthRequest = originalRequest?.url?.includes('auth/login') || 
                             originalRequest?.url?.includes('auth/register');

        if (error.response?.status === 401 && !isAuthRequest) {
            useAuthStore.getState().clearAuth();
        }

        return Promise.reject(error);
    }
);

export default api;
