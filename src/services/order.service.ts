import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api/common';

export interface OrderItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
        images: { image: string; is_main: boolean }[];
    };
    quantity: number;
    price: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface Order {
    id: number;
    user: number;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address: any;
    items: OrderItem[];
    created_at: string;
}

export const OrderService = {
    // Customer: Place a new order
    async placeOrder(shippingAddressId: number): Promise<ApiResponse<Order>> {
        const response = await api.post('orders/create/', { shipping_address: shippingAddressId });
        return response.data;
    },

    // Customer: Get my orders
    async getMyOrders(): Promise<ApiResponse<Order[]>> {
        const response = await api.get('orders/');
        return response.data;
    },

    // Customer/Vendor: Get order details
    async getOrderDetails(id: number): Promise<ApiResponse<Order>> {
        const response = await api.get(`orders/${id}/`);
        return response.data;
    },

    // Customer: Cancel order
    async cancelOrder(id: number): Promise<ApiResponse<Order>> {
        const response = await api.put(`orders/${id}/cancel/`);
        return response.data;
    },

    // Vendor: Get orders containing vendor items
    async getVendorOrders(): Promise<ApiResponse<Order[]>> {
        const response = await api.get('vendor/orders/');
        return response.data;
    },

    // Vendor: Update status of a specific item in an order
    async updateOrderItemStatus(id: number, status: OrderItem['status']): Promise<ApiResponse<OrderItem>> {
        const response = await api.put(`vendor/order-items/${id}/status/`, { status });
        return response.data;
    }
};
