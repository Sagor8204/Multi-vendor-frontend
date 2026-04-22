import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { AuthResponse } from '@/types/api/auth';

export const AuthService = {
    async register(data: any): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post('auth/register', data);
        return response.data;
    },

    async login(data: any): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post('auth/login', data);
        if (response.data.success) {
            localStorage.setItem('access_token', response.data.data.access);
            localStorage.setItem('refresh_token', response.data.data.refresh);
        }
        return response.data;
    },

    async logout(): Promise<ApiResponse<null>> {
        const refresh = localStorage.getItem('refresh_token');
        const response = await api.post('auth/logout', { refresh });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return response.data;
    },

    async refreshToken(refresh: string): Promise<ApiResponse<{ access: string }>> {
        const response = await api.post('auth/refresh', { refresh });
        return response.data;
    }
};
