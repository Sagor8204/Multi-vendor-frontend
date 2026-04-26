import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';
import { Product, Review } from '@/types/api/product';

export interface ProductListParams {
    search?: string;
    category?: number;
    category_slug?: string;
    vendor?: number;
    featured?: boolean;
    trending?: boolean;
    on_sale?: boolean;
    ordering?: 'price' | '-price' | 'created_at' | '-created_at';
}


export interface CreateProductData {
    name: string;
    description: string;
    category: number; // Category ID
    price: number;
    stock: number;
}

export interface ProductImageData {
    image: File;
    alt_text?: string;
    is_main?: boolean;
    order?: number;
}

export const ProductService = {
    // List all products with optional filters
    async listProducts(params?: ProductListParams): Promise<ApiResponse<Product[]>> {
        const response = await api.get('products/', { params });
        return response.data;
    },

    // List all products with optional filters
    async vendorProductsList(id: number): Promise<ApiResponse<Product[]>> {
        const response = await api.get(`products/vendor/${id}/`);
        return response.data;
    },

    // Get a single product by ID or slug
    async getProductDetail(idOrSlug: string | number): Promise<ApiResponse<Product>> {
        const response = await api.get(`products/${idOrSlug}/`);
        return response.data;
    },

    // Create a new product (Vendor only)
    async createProduct(data: CreateProductData): Promise<ApiResponse<Product>> {
        const response = await api.post('products/', data);
        return response.data;
    },

    // Update an existing product (Vendor only)
    async updateProduct(idOrSlug: string | number, data: Partial<CreateProductData>): Promise<ApiResponse<Product>> {
        const response = await api.put(`products/${idOrSlug}/`, data);
        return response.data;
    },

    // Delete a product (Vendor only)
    async deleteProduct(idOrSlug: string | number): Promise<ApiResponse<null>> {
        const response = await api.delete(`products/${idOrSlug}/`);
        return response.data;
    },

    // Upload images for a product (Vendor only)
    async uploadProductImages(productId: number, images: ProductImageData[]): Promise<ApiResponse<any>> {
        const formData = new FormData();
        images.forEach((img, index) => {
            formData.append(`images[${index}]image`, img.image);
            if (img.alt_text) formData.append(`images[${index}]alt_text`, img.alt_text);
            if (img.is_main !== undefined) formData.append(`images[${index}]is_main`, String(img.is_main));
            if (img.order !== undefined) formData.append(`images[${index}]order`, String(img.order));
        });

        const response = await api.post(`products/${productId}/images/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete a product image (Vendor only)
    async deleteProductImage(imageId: number): Promise<ApiResponse<null>> {
        const response = await api.delete(`products/images/${imageId}/`);
        return response.data;
    },

    // Get reviews for a specific product
    async getProductReviews(productId: number): Promise<ApiResponse<Review[]>> {
        const response = await api.get(`products/${productId}/reviews/`);
        return response.data;
    }
};

