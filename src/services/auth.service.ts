import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { AuthResponse } from '@/types/api/auth';
import { setTokens, clearStoredTokens, getRefreshToken } from '@/lib/auth/token';

export const AuthService = {
    async register(data: any): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post('auth/register', data);
        return response.data;
    },

    async login(data: any): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post('auth/login', data);
        if (response.data.success) {
            setTokens(response.data.data.access, response.data.data.refresh);
        }
        return response.data;
    },

    async logout(): Promise<ApiResponse<null>> {
        const refresh = getRefreshToken();
        const response = await api.post('auth/logout', { refresh });
        clearStoredTokens();
        return response.data;
    },

    async refreshToken(refresh: string): Promise<ApiResponse<{ access: string }>> {
        const response = await api.post('auth/refresh', { refresh });
        return response.data;
    }
};
