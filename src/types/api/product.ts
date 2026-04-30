import { User } from './auth';

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent?: number | null;
    description?: string | null;
    product_count: number;
}

export interface ProductImage {
    id: number;
    image: string;
    alt_text?: string;
    is_main: boolean;
    order?: number;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    total_review?: number;
    vendor: {
        id: number;
        store_name: string;
        store_logo?: string;
        average_rating?: number;
        vendor_rating?: number;
    };
    images: ProductImage[];
    average_rating?: number;
    review_count?: number;
}

export interface Review {
    id: number;
    product: number;
    user: {
        id: number;
        username: string;
        profile_image?: string;
    };
    rating: number; // 1-5
    comment: string;
    created_at: string;
}

