import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { Profile, Address, User } from '@/types/api/auth';

export const UserService = {
    // User Info
    async getUserInfo(): Promise<ApiResponse<User>> {
        const response = await api.get('auth/me');
        return response.data
    },

    // Profile Methods
    async getMyProfile(): Promise<ApiResponse<Profile>> {
        const response = await api.get('auth/profile/me/');
        return response.data;
    },

    async updateProfile(data: FormData | any): Promise<ApiResponse<Profile>> {
        const response = await api.put('auth/profile/me/', data, {
            headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
        });
        return response.data;
    },

    // Address Methods
    async listAddresses(): Promise<ApiResponse<Address[]>> {
        const response = await api.get('auth/addresses/');
        return response.data;
    },

    async addAddress(data: Omit<Address, 'id'>): Promise<ApiResponse<Address>> {
        const response = await api.post('auth/addresses/', data);
        return response.data;
    },

    async updateAddress(id: number, data: Partial<Address>): Promise<ApiResponse<Address>> {
        const response = await api.put(`auth/addresses/${id}/`, data);
        return response.data;
    },

    async deleteAddress(id: number): Promise<ApiResponse<null>> {
        const response = await api.delete(`auth/addresses/${id}/`);
        return response.data;
    }
};
