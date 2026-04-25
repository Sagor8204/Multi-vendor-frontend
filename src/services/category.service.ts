import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { Category } from '@/types/api/product';

export const CategoryService = {
    // List all categories or subcategories
    async listCategories(parentId: number | null = null): Promise<ApiResponse<Category[]>> {
        const params = parentId !== null ? { parent: parentId } : {};
        const response = await api.get('products/categories/', { params });
        return response.data;
    }
};

