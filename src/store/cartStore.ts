import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    vendor?: string;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: () => number;
    cartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, qty = 1) => {
                const cart = get().cart;
                const existing = cart.find((item) => item.id === product.id);
                if (existing) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: qty }] });
                }
            },
            removeFromCart: (id) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                if (quantity < 1) return;
                set({
                    cart: get().cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
                });
            },
            clearCart: () => set({ cart: [] }),
            cartTotal: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            cartCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
);
