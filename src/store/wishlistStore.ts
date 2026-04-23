import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    vendor?: string;
    slug?: string;
}

interface WishlistState {
    items: WishlistItem[];
    addToWishlist: (product: WishlistItem) => void;
    removeFromWishlist: (id: string | number) => void;
    isInWishlist: (id: string | number) => boolean;
    wishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (product) => {
                const items = get().items;
                if (!items.find((item) => item.id === product.id)) {
                    set({ items: [...items, product] });
                }
            },
            removeFromWishlist: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },
            isInWishlist: (id) => {
                return get().items.some((item) => item.id === id);
            },
            wishlistCount: () => get().items.length,
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
