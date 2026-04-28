import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';

export interface Vendor {
    id: number;
    store_name: string;
    store_description: string;
    store_logo: string | null;
    owner: number;
    is_verified: boolean;
    vendor_rating?: number;
    product_count?: number;
    created_at?: string;
    total_reviews?: number;
}

export const VendorService = {
    // List all vendors
    async listVendors(): Promise<ApiResponse<Vendor[]>> {
        const response = await api.get('vendor/');
        return response.data;
    },

    // Get vendor detail
    async getVendorDetail(id: number): Promise<ApiResponse<Vendor>> {
        const response = await api.get(`vendor/${id}/`);
        return response.data;
    },

    // Apply as a vendor
    async applyAsVendor(data: { store_name: string; store_description: string; store_logo?: string }): Promise<ApiResponse<Vendor>> {
        const response = await api.post('vendor/apply/', data);
        return response.data;
    },

    // Get my store profile
    async getMyStore(): Promise<ApiResponse<Vendor>> {
        const response = await api.get('vendor/me/');
        return response.data;
    },

    // Update my store
    async updateMyStore(data: Partial<{ store_name: string; store_description: string; store_logo: string }>): Promise<ApiResponse<Vendor>> {
        const response = await api.put('vendor/me/', data);
        return response.data;
    }
};
