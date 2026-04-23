'use client';

import React from 'react';
import { User, MapPin, Package, Settings, LogOut } from 'lucide-react';

interface ProfileSidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    logout: () => void;
}

export const ProfileSidebar = ({ activeTab, setActiveTab, logout }: ProfileSidebarProps) => {
    const sidebarLinks = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'addresses', label: 'Shipping Addresses', icon: MapPin },
        { id: 'orders', label: 'Order History', icon: Package },
        { id: 'settings', label: 'Security Settings', icon: Settings },
    ];

    return (
        <aside className="w-full lg:w-72 space-y-2">
            <div className="mb-8 px-4">
                <h1 className="text-2xl font-black text-main tracking-tight">My Account</h1>
                <p className="text-sm text-muted font-bold mt-1">Manage your settings</p>
            </div>

            <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => setActiveTab(link.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                            activeTab === link.id 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                            : 'text-muted hover:bg-white hover:text-primary border border-transparent hover:border-border/60'
                        }`}
                    >
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                    </button>
                ))}
            </nav>

            <div className="pt-8 border-t border-border/60 mt-8">
                <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-error hover:bg-error/5 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};
