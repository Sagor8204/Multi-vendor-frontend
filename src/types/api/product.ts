import { User } from './auth';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: number | null;
    children?: Category[];
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    vendor: {
        id: number;
        store_name: string;
        store_logo?: string;
    };
    images: {
        id: number;
        image: string;
        is_main: boolean;
    }[];
}
