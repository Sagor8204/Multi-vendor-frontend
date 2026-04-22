export interface User {
    id: number;
    username: string;
    email: string;
    role: 'customer' | 'vendor';
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface Profile {
    id: number;
    user: User;
    profile_image: string | null;
    phone: string;
    bio: string;
    date_of_birth: string | null;
}

export interface Address {
    id: number;
    full_name: string;
    phone: string;
    address_line: string;
    city: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}
