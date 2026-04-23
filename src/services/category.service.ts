import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { Category, Product } from '@/types/api/product';

export const CategoryService = {
    // List all categories or subcategories
    async listCategories(parentId: number | null = null): Promise<ApiResponse<Category[]>> {
        const params = parentId !== null ? { parent: parentId } : {};
        const response = await api.get('products/categories/', { params });
        return response.data;
    },

    // Get products for a specific category slug
    async getProductsByCategory(categorySlug: string): Promise<ApiResponse<Product[]>> {
        const response = await api.get('products/', { 
            params: { category_slug: categorySlug } 
        });
        return response.data;
    }
};
